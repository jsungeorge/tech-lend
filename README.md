# TechLend
> A Full-Stack Inventory Management System for tracking internal hardware loans.

###  Key Features
* **Real-Time Catalog:** Live inventory tracking backed by MongoDB.
* **Smart Validation:** Prevents checkout if stock is <= 0 (Server-side & Client-side).
* **Admin Dashboard:** Dedicated view for managers to return items and restock inventory.
* **Global State:** Redux Toolkit manages the cart across the application.

### Tech Stack
* **Frontend:** React + Vite + Redux Toolkit
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas

### How to Run Locally
This project is a monorepo (Client + Server). You need 2 terminals.

**1. Setup Backend**
```bash
cd server
npm install
# Create a .env file with: MONGO_URI=your_connection_string
npm run dev
```

**2. Setup Backend**
```bash

cd client
npm install
npm run dev
```
**3. Seed Database (Optional) If the catalog is empty, run this command to populate test data:
```bash

curl -X POST http://localhost:5001/api/seed
```
