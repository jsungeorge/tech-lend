require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Asset = require('./models/Asset');
const Loan = require('./models/Loan');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- ROUTES ---

// 1. get assets
app.get('/api/assets', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CREATE LOAN (Checkout) - WITH STOCK CHECK
app.post('/api/loans', async (req, res) => {
  const { items } = req.body;
  
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    for (const id of items) {
      const asset = await Asset.findById(id);
      if (!asset) {
        return res.status(404).json({ error: "Invalid Asset ID" });
      }
      if (asset.available <= 0) {
        return res.status(400).json({ 
          error: `Cannot checkout. ${asset.name} is out of stock.` 
        });
      }
    }
    // -----------------------------

    const loan = new Loan({ items });
    await loan.save();

    for (const id of items) {
      await Asset.findByIdAndUpdate(id, { $inc: { available: -1 } });
    }

    res.status(201).json(loan);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

// 3. return loan (admin)
app.put('/api/loans/:id/return', async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    if (loan.status === "Returned") return res.status(400).json({ error: "Already returned" });

    loan.status = "Returned";
    await loan.save();

    for (const itemId of loan.items) {
      await Asset.findByIdAndUpdate(itemId, { $inc: { available: 1 } });
    }
    console.log(`Loan ${loanId} returned. Inventory restocked.`);
    res.json({ message: "Loan returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. get all loans (admin dashboard)
app.get('/api/admin/loans', async (req, res) => {
  try {
    const loans = await Loan.find().populate('items').sort({ date: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. seed
app.post('/api/seed', async (req, res) => {
  await Asset.deleteMany({});
  const seedData = [
    { name: 'MacBook Pro M3', category: 'Laptops', stock: 5, available: 5 },
    { name: 'Dell UltraSharp 27"', category: 'Monitors', stock: 10, available: 10 },
    { name: 'Logitech MX Keys', category: 'Peripherals', stock: 15, available: 15 },
    { name: 'Oculus Quest 3', category: 'VR', stock: 3, available: 3 },
  ];
  await Asset.insertMany(seedData);
  res.json({ message: "Database Seeded!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));