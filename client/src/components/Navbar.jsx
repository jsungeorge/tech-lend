import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo Section */}
        <Link to="/" style={styles.logo}>
          TechLend <span style={{ color: 'var(--text-secondary)', fontSize: '0.8em' }}>Internal</span>
        </Link>

        {/* Links Section */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Catalog</Link>
          
          {/* Cart Badge - Updates automatically via Redux */}
          <Link to="/loans" style={styles.cartBtn}>
            Loan Cart
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Simple inline styles to keep it contained
const styles = {
  nav: {
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border)',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: '500'
  },
  cartBtn: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.8em'
  }
};

export default Navbar;