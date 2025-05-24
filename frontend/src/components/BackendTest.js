// src/components/BackendTest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackendTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(res => setMessage(res.data))
      .catch(err => setMessage("Error: " + err.message));
  }, []);

  return (
    <div className="p-3">
      <h4>Backend Test Result:</h4>
      <p>{message}</p>
    </div>
  );
};

export default BackendTest;