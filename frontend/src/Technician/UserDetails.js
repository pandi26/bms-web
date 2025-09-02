
import axios from 'axios';
import TechnicianNavbar from './TechnicianNavbar';
import './styles/UserManagement.css';
import { FaRegAddressCard } from 'react-icons/fa';
import { GrFormView } from 'react-icons/gr';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';

// Default battery image
const defaultBatteryImage = '/images/battery-img.jpg';

// Debounce utility
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [batteryId, setBatteryId] = useState('EVD034');
  const [batteryImage, setBatteryImage] = useState(null);
  const [batterySpecs, setBatterySpecs] = useState({
    capacity: '',
    type: '',
    voltage: '',
    weight: '',
    range: '',
    warranty: '',
  });
  const [purchaseDetails, setPurchaseDetails] = useState({
    purchaseDate: '',
    orderId: '',
    price: '',
    warrantyEnd: '',
  });
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showInputForm, setShowInputForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBatteryModal, setShowBatteryModal] = useState(false);
  const [batteryDetails, setBatteryDetails] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [lastAttemptedBatteryId, setLastAttemptedBatteryId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError('Error fetching users. Please check the backend server.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('batteryImage updated:', batteryImage);
  }, [batteryImage]);

  const handleView = (userId) => {
    console.log('Attempting to view user with ID:', userId);
    setSelectedUserId(userId);
    const user = users.find((u) => u.userId === userId);
    if (!user) {
      console.error('User not found for ID:', userId);
      setError('User not found. Please try again.');
      setShowInputForm(false);
      return;
    }
    console.log('Found user:', user);
    setSelectedUser(user);
    setShowInputForm(true);
    setBatteryId(lastAttemptedBatteryId || 'EVD034');
    setBatteryImage(null);
    setBatterySpecs({
      capacity: '',
      type: '',
      voltage: '',
      weight: '',
      range: '',
      warranty: '',
    });
    setPurchaseDetails({
      purchaseDate: '',
      orderId: '',
      price: '',
      warrantyEnd: '',
    });
    setFormSubmitted(false);
    setError(null);
    setUploadError(null);
    setIsUploading(false);
  };

  const handleViewBatteryDetails = async (batteryId) => {
    if (!batteryId || batteryId === 'N/A' || batteryId === 'na' || typeof batteryId !== 'string') {
      console.error('Invalid batteryId:', batteryId);
      setModalError('Invalid or missing battery ID. Please ensure the user has a valid battery assigned.');
      setBatteryDetails(null);
      setLastAttemptedBatteryId(null);
      setShowBatteryModal(true);
      return;
    }
    console.log('Fetching battery for batteryId:', batteryId);
    setLastAttemptedBatteryId(batteryId);
    try {
      const response = await axios.get(`http://localhost:5000/api/battery/by-battery/${batteryId}`, {
        timeout: 5000,
      });
      console.log('Battery details response:', response.data);
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('Empty response from server');
      }
      setBatteryDetails(response.data);
      setModalError(null);
      setShowBatteryModal(true);
    } catch (err) {
      console.error('Error fetching battery details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        requestUrl: `http://localhost:5000/api/battery/by-battery/${batteryId}`,
      });
      let errorMessage = 'Failed to fetch battery details. Please try again later.';
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to the backend server. Please ensure it is running.';
      } else if (err.response) {
        errorMessage =
          err.response.status === 404
            ? `No battery found for ID ${batteryId}. Would you like to add this battery?`
            : err.response.status === 500
            ? 'Server error: Please check the backend database and server logs.'
            : err.response.data?.error || errorMessage;
      }
      setModalError(errorMessage);
      setBatteryDetails(null);
      setShowBatteryModal(true);
    }
  };

  const handleAddBatteryFromModal = () => {
    const user = users.find((u) => u.batteryId === lastAttemptedBatteryId || u.userId === selectedUserId);
    if (user) {
      handleView(user.userId);
      setShowBatteryModal(false);
    } else {
      setModalError('No user associated with this battery ID. Please select a user to add the battery.');
    }
  };

  const handleInputChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    if (name === 'warranty' || name === 'purchaseDate') {
      const warrantyYears = name === 'warranty' ? parseInt(value) : parseInt(batterySpecs.warranty);
      const purchaseDate = name === 'purchaseDate' ? value : purchaseDetails.purchaseDate;
      if (warrantyYears && purchaseDate) {
        const date = new Date(purchaseDate);
        date.setFullYear(date.getFullYear() + warrantyYears);
        setPurchaseDetails((prev) => ({
          ...prev,
          warrantyEnd: date.toISOString().split('T')[0],
        }));
      } else {
        setPurchaseDetails((prev) => ({
          ...prev,
          warrantyEnd: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batteryId) {
      setError('Please enter a Battery ID');
      return;
    }
    if (!purchaseDetails.purchaseDate) {
      setError('Please enter a Purchase Date');
      return;
    }
    if (!batterySpecs.warranty) {
      setError('Please enter a Warranty period');
      return;
    }
    if (isUploading) {
      setError('Image upload in progress. Please wait.');
      return;
    }
    if (!batteryImage) {
      const confirm = window.confirm('No image uploaded. Proceed without an image?');
      if (!confirm) return;
    }
    const generatedOrderId = `ORD-${uuidv4().slice(0, 8)}`;
    const updatedPurchaseDetails = { ...purchaseDetails, orderId: generatedOrderId };
    try {
      console.log('Submitting battery:', {
        userId: selectedUserId,
        batteryId,
        imageUrl: batteryImage,
        specs: batterySpecs,
        purchaseDetails: updatedPurchaseDetails,
      });
      const response = await axios.post('http://localhost:5000/api/battery/add', {
        userId: selectedUserId,
        batteryId,
        imageUrl: batteryImage,
        specs: batterySpecs,
        purchaseDetails: updatedPurchaseDetails,
      });
      console.log('Battery add response:', response.data);
      setBatterySpecs(response.data.battery?.specs || batterySpecs);
      setPurchaseDetails(response.data.battery?.purchaseDetails || updatedPurchaseDetails);
      setBatteryImage(response.data.battery?.imageUrl || null);
      setFormSubmitted(true);
      setError(null);
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === selectedUserId ? { ...user, batteryId: batteryId } : user
        )
      );
    } catch (err) {
      console.error('Error adding battery:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to add battery. Please check the backend server.');
    }
  };

  const debouncedHandleImageUpload = debounce(async (file, batteryId, selectedUserId) => {
    if (!file) {
      setUploadError('No file selected');
      setIsUploading(false);
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    console.log('Validating file:', file.name, 'Type:', file.type);
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a JPEG, PNG, or GIF image');
      setIsUploading(false);
      return;
    }
    if (!selectedUserId) {
      setUploadError('User ID is missing. Please select a user.');
      setIsUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append('batteryImage', file);
    formData.append('batteryId', batteryId || 'EVD034');
    formData.append('userId', selectedUserId);
    try {
      console.log('Uploading image:', { userId: selectedUserId, batteryId: batteryId || 'EVD034', file: file.name, type: file.type });
      const response = await axios.post('http://localhost:5000/api/battery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Image upload response:', response.data);
      const imageUrl = response.data.imageUrl;
      if (imageUrl) {
        setBatteryImage(imageUrl);
        setUploadError(null);
      } else {
        console.error('No imageUrl in response:', response.data);
        setUploadError('No image URL returned from server');
        setBatteryImage(null);
      }
    } catch (err) {
      console.error('Image upload error:', err.response?.data || err.message);
      setUploadError(err.response?.data?.error || 'Failed to upload image');
      setBatteryImage(null);
    } finally {
      setIsUploading(false);
    }
  }, 500);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      console.log('Selected file:', file.name, 'Type:', file.type);
      debouncedHandleImageUpload(file, batteryId, selectedUserId);
    }
  };

  const handleStatusToggle = debounce(async (id, currentStatus, email) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}/status`, {
        status: newStatus.toLowerCase(),
        email,
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
      );
      alert(
        `User status updated to ${newStatus}${response.data.emailSent ? '' : ' (Email notification failed)'}`,
      );
    } catch (err) {
      console.error('Status update failed:', err.response?.data || err.message);
      const errorMessage =
        err.response?.status === 404
          ? 'User not found.'
          : err.response?.status === 500
          ? 'Server error: Please check the backend server.'
          : 'Failed to update status. Please try again.';
      alert(errorMessage);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }, 500);

  const handleBack = () => {
    setSelectedUserId('');
    setSelectedUser(null);
    setShowInputForm(false);
    setBatteryId('EVD034');
    setBatteryImage(null);
    setBatterySpecs({
      capacity: '',
      type: '',
      voltage: '',
      weight: '',
      range: '',
      warranty: '',
    });
    setPurchaseDetails({
      purchaseDate: '',
      orderId: '',
      price: '',
      warrantyEnd: '',
    });
    setFormSubmitted(false);
    setError(null);
    setUploadError(null);
    setIsUploading(false);
  };

  const handleStatusFilterToggle = () => {
    setStatusFilter((prev) => (prev === 'both' ? 'inactive' : 'both'));
  };

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const closeBatteryModal = () => {
    setShowBatteryModal(false);
    setBatteryDetails(null);
    setModalError(null);
    setLastAttemptedBatteryId(null);
  };

  const filteredUsers = users
    .filter((user) => (statusFilter === 'inactive' ? user.status === 'Inactive' : true))
    .filter((user) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.userId?.toLowerCase().includes(query) ||
        user.batteryId?.toLowerCase().includes(query)
      );
    });

  if (loading) return <div>Loading...</div>;
  if (error && !showInputForm) return <div className="error">{error}</div>;

  return (
    <div className="user-management">
      <TechnicianNavbar />
      <h2>User Management</h2>

      {!showInputForm ? (
        <>
          <div className="filter-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by username, email, user ID, or battery ID"
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="status-filter">
              <label>
                <input
                  type="checkbox"
                  checked={statusFilter === 'inactive'}
                  onChange={handleStatusFilterToggle}
                />
                Show Inactive Users Only
              </label>
            </div>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Battery Id</th>
                <th>State</th>
                <th>District</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created</th>
                <th>Role</th>
                <th>View Battery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="14" className="no-data">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userId}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.batteryId || 'N/A'}</td>
                    <td>{user.state || 'N/A'}</td>
                    <td>{user.district || 'N/A'}</td>
                    <td>
                      {user.address && user.pincode
                        ? `${user.address}, ${user.pincode}`
                        : 'N/A'}
                    </td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>{user.status}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>{user.role || 'N/A'}</td>
                    <td>
                      <button
                        className="icon-btn view-btn"
                        onClick={() => handleViewBatteryDetails(user.batteryId)}
                        title="View Battery Details"
                        disabled={!user.batteryId || user.batteryId === 'N/A'}
                        aria-label={`View battery details for ${user.batteryId || 'N/A'}`}
                      >
                        <GrFormView />
                      </button>
                    </td>
                    <td>
                      {(!user.batteryId || user.batteryId === 'N/A') && (
                        <button
                          className="icon-btn view-btn"
                          onClick={() => handleView(user.userId)}
                          title="Add Battery"
                          aria-label="Add battery"
                        >
                          <FaRegAddressCard />
                        </button>
                      )}
                      <button
                        className={`icon-btn ${
                          user.status === 'Active' ? 'deactivate' : 'activate'
                        }`}
                        onClick={() => handleStatusToggle(user.id, user.status, user.email)}
                        disabled={loadingStates[user.id] || false}
                        title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                        aria-label={user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                      >
                        {loadingStates[user.id]
                          ? 'Updating...'
                          : user.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div className="battery-data-section">
          <h3>
            Add Battery for User ID: {selectedUserId}
            {selectedUser ? ` (${selectedUser.username})` : ' (User not found)'}
          </h3>
          <button className="back-button" onClick={handleBack}>
            ← Back to User List
          </button>

          <div className="battery-input-container">
            <div className="form-section">
              <form onSubmit={handleSubmit} className="battery-input-form">
                <h4>Battery Information</h4>
                <div className="form-group">
                  <label htmlFor="batteryId">Battery ID:</label>
                  <input
                    type="text"
                    id="batteryId"
                    name="batteryId"
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
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {uploadError && <p className="error">{uploadError}</p>}
                  {isUploading && <p>Uploading image...</p>}
                </div>

                <h4>Purchase Details</h4>
                <div className="form-group">
                  <label htmlFor="purchaseDate">Purchase Date:</label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={purchaseDetails.purchaseDate}
                    onChange={(e) => handleInputChange(e, setPurchaseDetails, purchaseDetails)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={purchaseDetails.price}
                    onChange={(e) => handleInputChange(e, setPurchaseDetails, purchaseDetails)}
                    placeholder="Enter Price (e.g., $5000)"
                    required
                  />
                </div>

                <h4>Battery Specifications</h4>
                <div className="form-group">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    id="capacity"
                    name="capacity"
                    value={batterySpecs.capacity}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Capacity (e.g., 50 kWh)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type:</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={batterySpecs.type}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Type (e.g., Lithium-ion)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="voltage">Voltage:</label>
                  <input
                    type="text"
                    id="voltage"
                    name="voltage"
                    value={batterySpecs.voltage}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Voltage (e.g., 400 V)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={batterySpecs.weight}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Weight (e.g., 500 kg)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="range">Range:</label>
                  <input
                    type="text"
                    id="range"
                    name="range"
                    value={batterySpecs.range}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Range (e.g., 300 km)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="warranty">Warranty (years):</label>
                  <input
                    type="number"
                    id="warranty"
                    name="warranty"
                    value={batterySpecs.warranty}
                    onChange={(e) => handleInputChange(e, setBatterySpecs, batterySpecs)}
                    placeholder="Enter Warranty (e.g., 8)"
                    min="1"
                    required
                  />
                </div>

                <button type="submit" className="submit-button" disabled={isUploading}>
                  Add Battery
                </button>
              </form>
              {error && <p className="error">{error}</p>}
            </div>

            <div className="battery-preview-section">
              <h4>Image Preview</h4>
              {batteryImage ? (
                <img
                  src={batteryImage}
                  alt="Battery Preview"
                  className="battery-preview-image"
                  onError={(e) => {
                    console.error('Image failed to load:', batteryImage);
                    e.target.src = defaultBatteryImage;
                  }}
                />
              ) : (
                <p>{uploadError || 'No image uploaded'}</p>
              )}
            </div>
          </div>

          {formSubmitted && (
            <div className="battery-details-container1">
              <div className="purchase-details-left">
                <h4>Purchase Details</h4>
                <p>
                  <strong>Battery ID:</strong> {batteryId}
                </p>
                <p>
                  <strong>Purchase Date:</strong> {purchaseDetails.purchaseDate}
                </p>
                <p>
                  <strong>Order ID:</strong> {purchaseDetails.orderId}
                </p>
                <p>
                  <strong>Price:</strong> ${purchaseDetails.price}
                </p>
                <p>
                  <strong>Warranty End:</strong> {purchaseDetails.warrantyEnd}
                </p>
              </div>
              <div className="battery-details-right">
                <h4>Battery Specifications</h4>
                {batterySpecs.capacity ? (
                  <>
                    <p>
                      <strong>Capacity:</strong> {batterySpecs.capacity}
                    </p>
                    <p>
                      <strong>Type:</strong> {batterySpecs.type}
                    </p>
                    <p>
                      <strong>Voltage:</strong> {batterySpecs.voltage}
                    </p>
                    <p>
                      <strong>Weight:</strong> {batterySpecs.weight}
                    </p>
                    <p>
                      <strong>Range:</strong> {batterySpecs.range}
                    </p>
                    <p>
                      <strong>Warranty:</strong> {batterySpecs.warranty} years
                    </p>
                  </>
                ) : (
                  <p>No specifications available</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {showBatteryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Battery Details for ID: {lastAttemptedBatteryId || 'Unknown'}</h3>
            <button
              className="modal-close-btn"
              onClick={closeBatteryModal}
              aria-label="Close modal"
            >
              <div className="closi">✕</div>
            </button>
            {modalError ? (
              <div>
                <p className="error">{modalError}</p>
                {modalError.includes('No battery found') && (
                  <button
                    className="add-battery-btn"
                    onClick={handleAddBatteryFromModal}
                    aria-label="Add battery"
                  >
                    Add Battery
                  </button>
                )}
              </div>
            ) : batteryDetails ? (
              <div className="modal-body">
                <div className="battery-data-section">
                  <h4>Battery Information</h4>
                  <p>
                    <strong>Battery ID:</strong> {batteryDetails.battery_id || 'N/A'}
                  </p>
                  <p>
                    <strong>User ID:</strong> {batteryDetails.user_id || 'N/A'}
                  </p>
                  <div className="battery-preview-section">
                    <h4>Image</h4>
                    {batteryDetails.imageUrl ? (
                      <img
                        src={batteryDetails.imageUrl}
                        alt={`Battery ${batteryDetails.battery_id || 'N/A'}`}
                        className="battery-preview-image"
                        onError={(e) => {
                          console.error('Modal image failed to load:', batteryDetails.imageUrl);
                          e.target.src = defaultBatteryImage;
                        }}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                </div>
                <div className="battery-details-container1">
                  <div className="purchase-details-left">
                    <h4>Purchase Details</h4>
                    <p>
                      <strong>Purchase Date:</strong>{' '}
                      {batteryDetails.purchaseDetails?.purchaseDate
                        ? new Date(batteryDetails.purchaseDetails.purchaseDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <p>
                      <strong>Order ID:</strong>{' '}
                      {batteryDetails.purchaseDetails?.orderId || 'N/A'}
                    </p>
                    <p>
                      <strong>Price:</strong>{' '}
                      {batteryDetails.purchaseDetails?.price
                        ? `₹${batteryDetails.purchaseDetails.price}`
                        : 'N/A'}
                    </p>
                    <p>
                      <strong>Warranty End:</strong>{' '}
                      {batteryDetails.purchaseDetails?.warrantyEnd
                        ? new Date(batteryDetails.purchaseDetails.warrantyEnd).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="battery-details-right">
                    <h4>Battery Specifications</h4>
                    {batteryDetails.specs ? (
                      <>
                        <p>
                          <strong>Capacity:</strong>{' '}
                          {batteryDetails.specs.capacity || 'N/A'}
                        </p>
                        <p>
                          <strong>Type:</strong>{' '}
                          {batteryDetails.specs.type || 'N/A'}
                        </p>
                        <p>
                          <strong>Voltage:</strong>{' '}
                          {batteryDetails.specs.voltage || 'N/A'}
                        </p>
                        <p>
                          <strong>Weight:</strong>{' '}
                          {batteryDetails.specs.weight || 'N/A'}
                        </p>
                        <p>
                          <strong>Range:</strong>{' '}
                          {batteryDetails.specs.range || 'N/A'}
                        </p>
                        <p>
                          <strong>Warranty:</strong>{' '}
                          {batteryDetails.specs.warranty
                            ? `${batteryDetails.specs.warranty} years`
                            : 'N/A'}
                        </p>
                      </>
                    ) : (
                      <p>No specifications available</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="error">No battery data available. Please try again.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
