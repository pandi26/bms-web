
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TechnicianNavbar from './TechnicianNavbar';
import './styles/UserManagement.css';

// Sample battery image (placeholder)
const defaultBatteryImage = 'battery-img.jpg';

const BatteryInputPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [batteryId, setBatteryId] = useState('');
  const [batteryImage, setBatteryImage] = useState(defaultBatteryImage);
  const [batteryData, setBatteryData] = useState([]);
  const [batterySpecs, setBatterySpecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Sample specs if API fails or no battery ID provided
  const defaultSpecs = {
    capacity: "50 kWh",
    type: "Lithium-ion",
    voltage: "400 V",
    weight: "500 kg",
    range: "300 km",
    warranty: "8 years",
  };

  // Sample purchase details (replace with API call if available)
  const purchaseDetails = {
    purchaseDate: "2023-10-15",
    orderId: "ORD123456",
    price: "$5,000",
    warrantyEnd: "2031-10-15",
  };

  useEffect(() => {
    if (batteryId) {
      fetchBatteryData(batteryId);
      fetchBatterySpecs(batteryId);
    }
  }, [batteryId]);

  const fetchBatteryData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bmsdata/data2', {
        params: { user_id: userId, battery_id: id },
      });
      const power = 18;
      const processed = response.data.map(entry => {
        const voltage = parseFloat(entry.voltage) || 0;
        const current = voltage > 0 ? (power / voltage).toFixed(2) : "0.00";
        return {
          id: entry.id,
          cell1: parseFloat(entry.cell1 || 0).toFixed(2),
          cell2: parseFloat(entry.cell2 || 0).toFixed(2),
          cell3: parseFloat(entry.cell3 || 0).toFixed(2),
          voltage: voltage.toFixed(2),
          current,
          temperature: parseFloat(entry.temperature || 0).toFixed(2),
          timestamp: entry.timestamp || "N/A",
          status: entry.status || "N/A",
        };
      });
      setBatteryData(processed);
    } catch (err) {
      console.error("Error fetching battery data:", err);
      setError('Failed to fetch battery data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBatterySpecs = async (id) => {
    try {
      const response = await axios.get('http://localhost:5000/api/battery/specs', {
        params: { batteryId: id },
      });
      setBatterySpecs(response.data);
    } catch (err) {
      console.error("Error fetching battery specs:", err);
      setBatterySpecs(defaultSpecs); // Fallback to default specs
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('batteryImage', file);
    formData.append('batteryId', batteryId);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5000/api/battery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBatteryImage(response.data.imageUrl); // Assume backend returns image URL
      setUploadError(null);
    } catch (err) {
      console.error("Error uploading image:", err);
      setUploadError('Failed to upload image');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (batteryId) {
      fetchBatteryData(batteryId);
      fetchBatterySpecs(batteryId);
    }
  };

  const handleBack = () => {
    navigate('/user-details'); // Adjust route as needed
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management">
      <TechnicianNavbar />
      <h2>Battery Input for User ID: {userId}</h2>
      <button className="back-button" onClick={handleBack}>← Back to User List</button>

      <div className="battery-input-section">
        <form onSubmit={handleSubmit} className="battery-input-form">
          <div className="form-group">
            <label htmlFor="batteryId">Battery ID:</label>
            <input
              type="text"
              id="batteryId"
              value={batteryId}
              onChange={(e) => setBatteryId(e.target.value)}
              placeholder="Enter Battery ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="batteryImage">Upload Battery Image:</label>
            <input
              type="file"
              id="batteryImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploadError && <p className="error">{uploadError}</p>}
          </div>
          <button type="submit" className="submit-button">Fetch Data</button>
        </form>

        <div className="battery-details-container">
          {/* Left Side: Purchase Details and Battery ID */}
          <div className="battery-details-left">
            <h4>Purchase Details</h4>
            <p><strong>Battery ID:</strong> {batteryId || 'N/A'}</p>
            <p><strong>Purchase Date:</strong> {purchaseDetails.purchaseDate}</p>
            <p><strong>Order ID:</strong> {purchaseDetails.orderId}</p>
            <p><strong>Price:</strong> {purchaseDetails.price}</p>
            <p><strong>Warranty End:</strong> {purchaseDetails.warrantyEnd}</p>
          </div>

          {/* Right Side: Battery Image and Specifications */}
          <div className="battery-details-right">
            <img src={batteryImage} alt="EV Battery" className="battery-image" />
            <h4>Battery Specifications</h4>
            {batterySpecs ? (
              <>
                <p><strong>Capacity:</strong> {batterySpecs.capacity}</p>
                <p><strong>Type:</strong> {batterySpecs.type}</p>
                <p><strong>Voltage:</strong> {batterySpecs.voltage}</p>
                <p><strong>Weight:</strong> {batterySpecs.weight}</p>
                <p><strong>Range:</strong> {batterySpecs.range}</p>
                <p><strong>Warranty:</strong> {batterySpecs.warranty}</p>
              </>
            ) : (
              <p>No specifications available</p>
            )}
          </div>

          {/* Battery Data Table */}
          {batteryData.length > 0 ? (
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
                {batteryData.map(data => (
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
          ) : (
            <p>No battery data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatteryInputPage;
