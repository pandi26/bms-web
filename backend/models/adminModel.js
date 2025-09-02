const pool = require("../config/db");

class AdminModel {
    static async findAdminByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
        return rows.length ? rows[0] : null;
    }

    static async createAdmin(username, email, hashedPassword) {
        await pool.query("INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)", 
        [username, email, hashedPassword, "admin"]);
    }
}

module.exports = AdminModel;
