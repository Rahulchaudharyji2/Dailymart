// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home';
import DealofDay from './Pages/DealofDay';
import Cart from './Pages/Cart';
function App() {
  return (
    <div>
      <Navbar />
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Deals" element={<DealofDay />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
