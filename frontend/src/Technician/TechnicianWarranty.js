import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/TechnicianWarranty.css";
import TechnicianNavbar from "./TechnicianNavbar";

function TechnicianWarranty() {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchWarrantyClaims();
  }, []);

  const fetchWarrantyClaims = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/warranty/data");
      setWarranties(response.data || []);
      setError("");
    } catch (error) {
      console.error("Failed to fetch warranty claims:", error);
      setError("Failed to load warranty claims. Try again later.");
      setWarranties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTechVerifyUpdate = async (claimId, newStatus) => {
    if (updating) return;
    try {
      setUpdating(true);
      const response = await axios.put(
        `http://localhost:5000/api/warranty/techverify/${claimId}`,
        { tech_verify: newStatus }
      );

      if (response.status === 200) {
        alert(`Claim ID ${claimId} marked as ${newStatus} by technician`);
        await fetchWarrantyClaims();
      } else {
        alert("Failed to update tech verification.");
      }
    } catch (error) {
      console.error("Error updating tech verification:", error);
      alert("Error occurred while updating verification.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCopy = (userId) => {
    navigator.clipboard.writeText(userId).then(
      () => {
        setCopiedId(userId);
        setTimeout(() => setCopiedId(null), 2000);
      },
      (err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy User ID.");
      }
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <div className="technician-warranty-container">
      <TechnicianNavbar />

      <h2>🛠 Technician Warranty Verification</h2>

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
              <th>User ID</th>
              <th>User Email</th>
              <th>Phone</th>
              <th>Battery Serial</th>
              <th>Purchase Date</th>
              <th>Issue</th>
              <th>Submitted At</th>
              <th>Tech Verify</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{claim.user_id}</span>
                    <button
                      onClick={() => handleCopy(claim.user_id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                      title="Copy User ID"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    {copiedId === claim.user_id && (
                      <span style={{ color: "green", fontSize: "12px" }}>Copied!</span>
                    )}
                  </div>
                </td>
                <td>{claim.email || "N/A"}</td>
                <td>{claim.phone || "N/A"}</td>
                <td>{claim.battery_serial || "N/A"}</td>
                <td>{formatDate(claim.purchase_date)}</td>
                <td>{claim.issue_description || "N/A"}</td>
                <td>{formatDate(claim.submitted_at)}</td>
                <td>{claim.tech_verify}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleTechVerifyUpdate(claim.id, "Verified")}
                      className="approve-btn"
                      disabled={updating}
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleTechVerifyUpdate(claim.id, "Rejected")}
                      className="reject-btn"
                      disabled={updating}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TechnicianWarranty;