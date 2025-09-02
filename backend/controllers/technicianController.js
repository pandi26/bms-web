const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Technician = require("../models/Technician"); // Ensure this path is correct

exports.technicianSignup = async (req, res) => {
    try {
        const { username, email, password, age, address, phone, expertise } = req.body;

        if (!username || !email || !password || !expertise) {
            return res.status(400).json({ message: "Required fields are missing." });
        }
         
       console.log(email);


        console.log("Checking if technician exists...");

        const existingTechnician = await Technician.findOne({ where: { email } });

        if (existingTechnician) {
            return res.status(400).json({ message: "Technician already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTechnician = await Technician.create({
            username, email, password: hashedPassword, age, address, phone, expertise,
        });

        res.status(201).json({ message: "Technician registered successfully!", technician: newTechnician });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.technicianLogin = async (req, res) => {
    try {
        console.log("Login request received:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const technician = await Technician.findOne({ where: { email } });
        if (!technician) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, technician.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: technician.id, email: technician.email, role: "Technician" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Login successful",
            token,
            userId: technician.id,
            email: technician.email,
            name: technician.username
        });
    } catch (error) {
        console.error("Technician login error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
