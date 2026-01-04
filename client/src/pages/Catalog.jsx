import { useEffect, useState } from 'react';
import axios from 'axios';
import AssetCard from '../components/AssetCard';

const Catalog = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch backend
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/assets?t=${new Date().getTime()}`);
        setAssets(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assets:", err);
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading inventory...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Asset Catalog</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Real-time inventory from MongoDB.
        </p>
      </header>

      <div style={styles.grid}>
        {assets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px'
  }
};

export default Catalog;