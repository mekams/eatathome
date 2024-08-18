// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Routes, useNavigate  } from 'react-router-dom';
import Home from './Home'; 
import AboutUs from './AboutUs';
import ContactUs from './ContactUs'; 
import ItemDetails from './ItemDetails';
import Login from './Login';
import Signup from './Signup';
import ChangePassword from './ChangePassword';
import ShowCart from './ShowCart';
import MyOrder from './MyOrder';
import OrderHistory from './OrderHistory';
import { useAuth } from './AuthContext';
import './App.css'

const App = () => {

  const { isAuthenticated, logout } = useAuth();
  
 
  return (
    <Router>
      <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Eat@Home</h1>
          </Link>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }} className="px-2">Home</Link>
            <Link to="/contact-us" style={{ textDecoration: 'none' }} className="px-2">Contact Us</Link>
            <Link to="/about-us" style={{ textDecoration: 'none' }} className="px-2">About Us</Link>
            {isAuthenticated ? (
              <> <Link to="/orderhistory" style={{ textDecoration: 'none' }} className="px-2">Order History</Link>
              <button onClick={logout} style={{ textDecoration: 'none' }} className='btn btn-link'>Logout</button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }} className="px-2">Login</Link>
            )}
            <Link to="/cart" className="px-2">
              <img src='/images/cart.png' alt='Cart' style={{ height: '32px' }} />
            </Link>
          </div>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/cart" element={<ShowCart />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default App;


