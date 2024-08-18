import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '', // Changed from 'password' to 'newPassword' for clarity
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
      const response = await axios.put('http://localhost:5500/update-password', formData);
      alert('Password changed successfully.');
      navigate('/login'); // Redirect to login after successful password change
    } catch (error) {
      console.error('Password Change error:', error.response ? error.response.data : error);
      alert('Error during password change.');
    }
  };

  return (
    <div className='text-center'>
      <h2>Change Password</h2>
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
          name="newPassword" // Changed name to 'newPassword'
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        /><br/><br/>
        <button type="submit" className='btn btn-primary'>Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
