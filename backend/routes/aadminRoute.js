const express = require("express");
const router = express.Router();
const db = require("../config/db"); // your MySQL connection
const { QueryTypes } = require("sequelize");

// ✅ GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    // Count users (assuming role column differentiates user & technician)
    const [userResult] = await db.query(
      "SELECT COUNT(*) AS userCount FROM users"
    );

    const [technicianResult] = await db.query(
      "SELECT COUNT(*) AS technicianCount FROM technicians"
    );

    const [warrantyResult] = await db.query(
      "SELECT COUNT(*) AS warrantyCount FROM warranty_claims"
    );

    res.json({
      userCount: userResult[0].userCount,
      technicianCount: technicianResult[0].technicianCount,
      warrantyCount: warrantyResult[0].warrantyCount,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
