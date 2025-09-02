// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api/user"; // Ensure this matches your backend routes

// const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Fetch user profile with error handling
// export const fetchUserProfile = async (token) => {
//     try {
//         const response = await api.get("/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching user profile:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Export `api` for general use
// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this matches your backend
  headers: { "Content-Type": "application/json" },
});

export default api;
