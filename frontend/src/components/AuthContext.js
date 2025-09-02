import jwtDecode from "jwt-decode";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    return jwtDecode(token); // Decode token
  } catch (error) {
    return null;
  }
};
