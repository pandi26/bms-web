
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles/TechnicianManagement.css';
import { FaTrash } from 'react-icons/fa';

const TechnicianManagement = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch technicians data
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/technicians');
        // Log the response to verify field names
        console.log('API Response:', response.data);
        setTechnicians(response.data);
      } catch (err) {
        setError('Error fetching technician data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Invalid Date';
  };

  // Delete technician and associated battery data
  const handleDelete = async (id, email) => {
    if (window.confirm('Are you sure you want to delete this technician? This will also delete their associated battery data.')) {
      try {
        // Delete the technician and their data
        await axios.delete(`http://localhost:5000/api/admin/technicians/${id}`); // Updated endpoint
        // Remove the deleted technician from the local state
        setTechnicians(technicians.filter((tech) => tech.id !== id));
        alert('Technician and associated battery data deleted successfully.');
      } catch (err) {
        alert('Error deleting technician and their data.');
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="technician-management">
      <Navbar />
      <h2>Technician Information</h2>
      {technicians.length === 0 ? (
        <div className="no-data">No technicians found.</div>
      ) : (
        <div className="table-container">
          <table className="technician-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Expertise</th>
                <th>Joined On</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => (
                <tr key={tech.id}>
                  <td>{tech.id}</td>
                  <td>{tech.username || 'N/A'}</td>
                  <td>{tech.email || 'N/A'}</td>
                  <td>{tech.age || 'N/A'}</td>
                  <td>{tech.address || 'N/A'}</td>
                  <td>{tech.phone || 'N/A'}</td>
                  <td>{tech.expertise || 'N/A'}</td>
                  <td>{formatDate(tech.created_at || tech.createdAt)}</td>
                  <td>{formatDate(tech.updatedAt)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(tech.id, tech.email)}
                      className="icon-btn delete"
                      title="Delete Technician"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TechnicianManagement;