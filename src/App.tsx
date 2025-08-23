import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Menu from './components/Menu';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Drawings from './pages/drawings/Drawings';
import About from './pages/about/About';
import Contact from './pages/contact/Contact'; 
import Cart from './pages/shopping-cart/ShoppingCart'; 
import PageNotFound from './pages/page-not-found/PageNotFound';
import ProductDetail from './pages/shop/ProductDetail';
import DrawingDetail from './pages/drawings/DrawingDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:identifier" element={<ProductDetail />} />
          <Route path="/drawings" element={<Drawings />} />
          <Route path="/drawings/:identifier" element={<DrawingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App