const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ Import JWT
const { Admin } = require("../models"); // ✅ Ensure Admin model is imported

// Admin Signup
exports.adminSignup = async (req, res) => {
  try {
    console.log("Admin signup request received:", req.body); // Debugging log

    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ FIXED: Admin Login (uses email instead of username)
exports.adminLogin = async (req, res) => {
  try {
    console.log("Admin login request received:", req.body); // Debugging log

    const { email, password } = req.body; // ✅ Use email instead of username
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ where: { email } }); // ✅ Find by email
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id, role: "admin" }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
