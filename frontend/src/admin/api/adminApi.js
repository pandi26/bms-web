import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const adminSignup = async (adminData) => {
  return await axios.post(`${API_URL}/adminsignup`, adminData);
};

export const adminLogin = async (adminData) => {
  return await axios.post(`${API_URL}/adminlogin`, adminData);
};
