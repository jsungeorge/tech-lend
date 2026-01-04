import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import LoanCart from './pages/LoanCart';

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/loans" element={<LoanCart />} />
      </Routes>
    </div>
  )
}

export default App;