import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        if (decodedToken.exp * 100000 < Date.now()) {
          setError("Session expired. Please log in again.");
          sessionStorage.clear();
          navigate("/login");
          return;
        }

        const email = decodedToken.email;
        if (!email) {
          setError("Invalid token: email missing.");
          navigate("/login");
          return;
        }

        // Fetch user details by email from backend API
        const response = await fetch(`http://localhost:5000/api/profile/email/${encodeURIComponent(email)}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        sessionStorage.setItem("email", userData.email);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Invalid session or server error. Please log in again.");
        sessionStorage.clear();
        navigate("/login");
        return;
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [navigate]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        marginTop: "140px",
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2>User Profile</h2>
      {user ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <tbody>
            {Object.entries(user).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    width: "30%",
                    textTransform: "capitalize",
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </th>
                <td style={{ padding: "8px", textAlign: "left" }}>
                  {value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available.</p>
      )}

      <button
        onClick={handleBack}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Go Back
      </button>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
