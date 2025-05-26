import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegStyle.css';
import Lottie from 'lottie-react';
import rocketAnimation from '../assets/rocket.json'; // Replace with your chosen animation

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

  useEffect(() => {
    const card = document.querySelector('.glass-card');
    card.classList.add('animate-entrance');
  }, []);

  return (
    <div className="register-page">
      <Lottie animationData={rocketAnimation} className="rocket" loop autoplay />
      <div className="glass-card">
        <h2>Join the Journey</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <button type="submit" className="glass-button">Register</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;