const db = require("../config/db"); // Ensure database connection is imported

const getUserById = (userId, callback) => {
  if (!userId) {
    console.error("getUserById Error: No userId provided");
    return callback(new Error("Invalid userId"), null);
  }

  const query = "SELECT id, name, email FROM users WHERE id = ?";
  console.log("Executing Query:", query, "with ID:", userId); // Debugging

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database Error in getUserById:", err);
      return callback(err, null);
    }
    callback(null, result.length ? result[0] : null);
  });
};

const getUserByEmail = (email, callback) => {
  if (!email) {
    console.error("getUserByEmail Error: No email provided");
    return callback(new Error("Invalid email"), null);
  }

  const query = "SELECT * FROM users WHERE email = ?";
  console.log("Executing Query:", query, "with Email:", email); // Debugging

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database Error in getUserByEmail:", err);
      return callback(err, null);
    }
    callback(null, result.length ? result[0] : null);
  });
};

module.exports = { getUserById, getUserByEmail };
