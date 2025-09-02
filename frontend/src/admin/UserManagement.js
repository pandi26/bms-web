import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles/UserManagement.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [batteryData, setBatteryData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [batteryLoading, setBatteryLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users data');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // View battery data for user
  const handleView = async (email) => {
    setSelectedEmail(email);
    setBatteryLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bmsdata/data2', {
        params: { email },
      });

      const power = 18; // watts
      const processedData = response.data.map((entry) => {
        const voltage = parseFloat(entry.voltage) || 0;
        const cell1 = parseFloat(entry.cell1) || 0;
        const cell2 = parseFloat(entry.cell2) || 0;
        const cell3 = parseFloat(entry.cell3) || 0;
        const current = voltage > 0 ? (power / voltage).toFixed(2) : "0.00";
        const temperature = parseFloat(entry.temperature) || 0;

        return {
          id: entry.id,
          timestamp: entry.timestamp || "N/A",
          cell1: cell1.toFixed(2),
          cell2: cell2.toFixed(2),
          cell3: cell3.toFixed(2),
          voltage: voltage.toFixed(2),
          current,
          temperature: temperature.toFixed(2),
          event: entry.event || "N/A",
          status: entry.status || "N/A",
        };
      });

      setBatteryData(processedData);
    } catch (error) {
      console.error("Error fetching user-specific BMS data:", error);
    } finally {
      setBatteryLoading(false);
    }
  };

  // Delete user and their battery data
  const handleDelete = async (id, email) => {
    const confirmed = window.confirm('Are you sure you want to delete this user? This will also delete their associated battery data.');
    if (confirmed) {
      try {
        // Delete associated battery data first
        await axios.delete(`http://localhost:5000/api/bmsdata/${email}`);

        // Now delete the user
        await axios.delete(`http://localhost:5000/api/users/${id}`);

        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user.id !== id));
        setBatteryData([]); // Clear battery data since the user is deleted
        alert('User and associated battery data deleted successfully.');
      } catch (err) {
        alert('Error deleting user and their data.');
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleBackToUsers = () => {
    setSelectedEmail('');
    setBatteryData([]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management">
      <Navbar />
      <h2>User Management</h2>

      {!selectedEmail && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.role || 'user'}</td>
                <td>
                  <button onClick={() => handleView(user.email)} className="icon-btn view">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(user.id)} className="icon-btn edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.id, user.email)} className="icon-btn delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Battery Data Section */}
      {selectedEmail && (
        <div className="battery-data-section">
          <h3>Battery Data for: {selectedEmail}</h3>
          <button onClick={handleBackToUsers} className="back-button">← Back to User List</button>
          {batteryLoading ? (
            <div>Loading battery data...</div>
          ) : batteryData.length === 0 ? (
            <p>No battery data available.</p>
          ) : (
            <table className="battery-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cell1</th>
                  <th>Cell2</th>
                  <th>Cell3</th>
                  <th>Voltage</th>
                  <th>Current</th>
                  <th>Temperature</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {batteryData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.cell1}</td>
                    <td>{data.cell2}</td>
                    <td>{data.cell3}</td>
                    <td>{data.voltage}</td>
                    <td>{data.current}</td>
                    <td>{data.temperature}</td>
                    <td>{new Date(data.timestamp).toLocaleString()}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
