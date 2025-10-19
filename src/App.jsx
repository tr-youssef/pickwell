

import { useState } from 'react';
import Menu from './Menu.jsx';
import ShopPage from './pages/ShopPage.jsx';
import './App.css';
import { CartProvider } from './lib/CartContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CheckoutTable from './component/CheckoutTable.jsx';
import PickupMap from './pages/PickupMap.jsx';
import BarcodePage from './pages/BarcodePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';

function App() {
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    import('i18next').then(({ default: i18n }) => {
      i18n.changeLanguage(newLang);
    });
  };

  const handleLogin = (admin = false) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <CartProvider>
      <Router>
        <Menu language={language} onLanguageChange={handleLanguageChange} isAdmin={isAdmin} />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CheckoutTable />} />
            <Route path="/profile" element={<div className='max-w-2xl mx-auto p-8 bg-white rounded-xl shadow mt-8'><h2 className='text-xl font-bold mb-4'>Profile</h2><p>Profile details go here.</p></div>} />
            <Route path="/pickup" element={<PickupMap />} />
            <Route path="/barcode" element={<BarcodePage />} />
            <Route path="/orders" element={isAdmin ? <OrdersPage /> : <Navigate to="/" replace />} />
            <Route path="/config" element={isAdmin ? <div className='max-w-2xl mx-auto p-8 bg-white rounded-xl shadow mt-8'><h2 className='text-xl font-bold mb-4'>Configuration</h2><p>Admin configuration settings go here.</p></div> : <Navigate to="/" replace />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
