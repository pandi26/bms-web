
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar
import "./styles/AdminWarranty.css";

function AdminWarranty() {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchWarrantyClaims();
  }, []);

  const fetchWarrantyClaims = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/warranty/data`);
      setWarranties(response.data);
    } catch (error) {
      console.error("Failed to fetch warranty claims:", error);
      setError("Failed to load warranty claims. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (claimId, newStatus) => {
    try {
      setUpdating(true); // Start updating
      const response = await axios.put(`http://localhost:5000/api/warranty/update/${claimId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        fetchWarrantyClaims(); // Reload updated data
        alert(`Warranty claim ${claimId} has been ${newStatus}!`);
      } else {
        alert('Failed to update warranty status.');
      }
    } catch (error) {
      console.error('Error updating warranty status:', error);
      alert('Error occurred while updating warranty status.');
    } finally {
      setUpdating(false); // Stop updating
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="admin-warranty-container">
      <Navbar /> {/* Add Navbar at the top */}

      <h2>🔧 Warranty Claims Management</h2>

      {loading ? (
        <p>Loading warranty claims...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : warranties.length === 0 ? (
        <p>No warranty claims found.</p>
      ) : (
        <table className="warranty-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>User Email</th>
              <th>Phone</th>
              <th>Battery Serial</th>
              <th>Purchase Date</th>
              <th>Issue Description</th>
              <th>Claim Date</th>
              <th>Tech verify</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.email || "N/A"}</td>
                <td>{claim.phone || "N/A"}</td>
                <td>{claim.battery_serial || "N/A"}</td>
                <td>{formatDate(claim.purchase_date)}</td>
                <td>{claim.issue_description || "N/A"}</td>
                <td>{formatDate(claim.submitted_at)}</td>
                <td>{claim.tech_verify}</td>
                <td>{claim.status || "Pending"}</td>
                <td>
                  {claim.status === "Approved" ? (
                    <span>Approved</span> // Display text or leave empty
                  ) : (
                    <div className="action-buttons">
                      <button
                        onClick={() => handleStatusUpdate(claim.id, "Approved")}
                        className="approve-btn"
                        disabled={updating}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(claim.id, "Rejected")}
                        className="reject-btn"
                        disabled={updating}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminWarranty;