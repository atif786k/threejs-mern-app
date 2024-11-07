import React, { useState } from 'react';
import axios from '../axios';
// import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
//   const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
    //   login(response.data.user); // Assuming the response contains user data
      localStorage.setItem('token', response.data.token); // Store token in local storage
      navigate('/objects'); // Redirect to Object List Page
      console.log('Login successful')
      console.log(response.data.msg)
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
