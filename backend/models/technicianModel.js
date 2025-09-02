const pool = require("../config/db");

const TechnicianModel = {
    findTechnicianByEmail: async (email) => {
        try {
            const [rows] = await pool.query("SELECT * FROM technicians WHERE email = ?", [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching technician by email:", error);
            throw error;
        }
    },

    createTechnician: async (username, email, password, age, address, phone, expertise) => {
        try {
            await pool.query(
                "INSERT INTO technicians (username, email, password, age, address, phone, expertise) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [username, email, password, age, address, phone, expertise]
            );
        } catch (error) {
            console.error("Error inserting technician:", error);
            throw error;
        }
    }
};

module.exports = TechnicianModel;
