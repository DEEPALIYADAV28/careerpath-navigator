// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-primary">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;