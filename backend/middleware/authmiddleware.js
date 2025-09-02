// backend/middleware/authMiddleware.js
const { verifyToken } = require("../utils/authHelper");

const verifyAuthToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyAuthToken;







// const { verifyToken } = require("../utils/authHelper");

// const verifyAuthToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

//   if (!token) {
//     return res.status(403).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = verifyToken(token);
//     console.log(verifyToken);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = verifyAuthToken;