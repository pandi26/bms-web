import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found, please login");

    const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
