import React, { useState } from 'react';
import { adminSignup, adminLogin } from '../api/adminApi';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await adminSignup(formData);
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } else {
        const res = await adminLogin(formData);
        sessionStorage.setItem('adminToken', res.data.token);
        sessionStorage.setItem('adminName', res.data.name);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
{/* stemp 
      <div className="auth-container">
        <h2>{isSignup ? "admin signup": 'admin login'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit ={handleSubmit}>
          {isSignup &&(
          <input type ="name" name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input type="email"  name="email" placeholder="email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="password" onChange={handleChange} required />
        <button type="submit">{isSignup ? 'Signup' : 'login'}</button>
        </form>
        </div>



   temp */}
      <p onClick={toggleMode}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
      </p>
    </div>
  );
};

export default AdminAuth;
