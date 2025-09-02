
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Import MySQL connection pool
const verifyAuthToken = require("../middleware/authmiddleware"); // ✅ Ensure this is correctly imported

// Fetch user profile by ID
router.get("/:id", verifyAuthToken, (req, res) => { // ✅ Ensure this function is correctly defined
    const userId = req.params.id;

    pool.query(
        "SELECT id, username, email, phone, address FROM users WHERE id = ?",
        [userId],
        (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(results[0]); // ✅ Return user details
        }
    );
});

  
module.exports = router;
