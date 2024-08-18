// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    postCode: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const response = await axios.post('http://localhost:5500/signup', formData);
      alert('Signup successful, please login.');
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error);
      alert('Error during signup.');
    }
  };

  return (
    <div className='text-center'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="text"
          name="postCode"
          placeholder="Postal Code"
          value={formData.postCode}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        /><br/><br/>
        <button type="submit" className='btn btn-primary'>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
