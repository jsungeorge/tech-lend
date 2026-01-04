import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoanCart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmit = async () => {
    try {
      const itemIds = items.map(item => item._id);
      
      await axios.post('http://localhost:5001/api/loans', { items: itemIds });
      
      alert('Loan Confirmed! Assets have been reserved.');
      dispatch(clearCart());
      
      // 👇 THIS IS THE MAGIC FIX 👇
      window.location.href = "/"; 
      // This forces the browser to reload the Catalog page from scratch,
      // which will fetch the NEW numbers (12) from the database.

    } catch (err) {
      alert('Error processing loan.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Loan Request</h1>
      
      <div style={styles.list}>
        {items.map((item) => (
          <div key={item._id} style={styles.item}>
            <div style={styles.info}>
              <div style={styles.placeholderIcon}>{item.category[0]}</div>
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {item.category}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => handleRemove(item._id)} 
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Total Items: <strong>{items.length}</strong>
        </p>
        <button onClick={handleSubmit} className="btn btn-primary">
          Confirm Request
        </button>
      </div>
    </div>
  );
};

const styles = {
  emptyState: { textAlign: 'center', marginTop: '100px' },
  list: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border)'
  },
  info: { display: 'flex', gap: '16px', alignItems: 'center' },
  placeholderIcon: {
    width: '40px', height: '40px',
    backgroundColor: '#e0e7ff', color: 'var(--primary)',
    borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
  },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--danger)',
    cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem'
  },
  footer: {
    marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  }
};

export default LoanCart;