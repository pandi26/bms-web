import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    userId: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      const name = sessionStorage.getItem('name');
      const email = sessionStorage.getItem('email');
      const userId = sessionStorage.getItem('userId');

      setUserData({ name, email, userId });

      // Print userId to console
      console.log("User ID:", userId);
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>User ID:</strong> {userData.userId}</p>
      </div>
    </div>
  );
};

export default Dashboard;
