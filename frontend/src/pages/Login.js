 // src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', res.data.token);
      setMessage(`Welcome ${res.data.user.name}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-success">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default Login;