// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/login', credentials);
      
      if (response.data.userId) {
        login(response.data.userId);
        navigate('/');
      } else {
        // This else block handles cases where the server doesn't return a userId (indicating a login failure)
        alert('Incorrect credentials');
      }
    } catch (error) {
      // Handle error response from the server
      if (error.response && error.response.status === 401) {
        alert('Incorrect email or password');
      } else {
        console.error('Login failed', error);
        alert('An error occurred during login. Please try again.');
      }
    }
  };
  

  return (
    <div className='text-center'>
    <br/><br/>
    <h2>Login </h2>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required /><br/><br/>
      <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required /><br/><br/>
      <button type="submit" className='btn btn-primary'onClick={handleSubmit}>Login</button><br/><br/>
      <Link to="/signup">Don't have an account? Sign up</Link>
      <br></br>
      <Link to="/changepassword">Forgot password</Link>
    </form>
    </div>
  );
};

export default Login;
