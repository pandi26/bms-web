// // // require("dotenv").config();
// // // const express = require("express");
// // // const cors = require("cors");
// // // const { Sequelize, DataTypes } = require("sequelize");
// // // const bcrypt = require("bcryptjs");
// // // const jwt = require("jsonwebtoken");
// // // const { v4: uuidv4 } = require("uuid");
// // // const db = require("./config/db"); // DB config (if needed elsewhere)
// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // Middleware
// // // app.use(
// // //   cors({
// // //     origin: "http://localhost:3000",
// // //     methods: ["GET", "POST", "PUT", "DELETE"],
// // //     allowedHeaders: ["Content-Type", "Authorization"],
// // //     credentials: true,
// // //   })
// // // );
// // // app.use(express.json({ limit: "10mb" }));
// // // //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // // app.use('/uploads', express.static('uploads'));
// // // // Sequelize Database Configuration
// // // const sequelize = new Sequelize(
// // //   process.env.MYSQL_DB,
// // //   process.env.MYSQL_USER,
// // //   process.env.MYSQL_PASSWORD,
// // //   {
// // //     host: process.env.MYSQL_HOST,
// // //     dialect: "mysql",
// // //     logging: false,
// // //   }
// // // );

// // // // User Model
// // // const User = sequelize.define("User", {
// // //   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
// // //   userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
// // //   username: { type: DataTypes.STRING, allowNull: false },
// // //   email: { type: DataTypes.STRING, allowNull: false, unique: true },
// // //   password: { type: DataTypes.STRING, allowNull: false },
// // //   age: { type: DataTypes.INTEGER, allowNull: false },
// // //   address: { type: DataTypes.STRING, allowNull: false },
// // //   phone: { type: DataTypes.STRING, allowNull: false },
// // //   state: { type: DataTypes.STRING, allowNull: false },
// // //   district: { type: DataTypes.STRING, allowNull: false },
// // //   pincode: { type: DataTypes.STRING, allowNull: false },
// // //   batteryId: { type: DataTypes.STRING, allowNull: false },
// // //   role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
// // //   status: { type: Sequelize.STRING, defaultValue: "requested" },
// // // });

// // // // Sync Database
// // // const syncDatabase = async () => {
// // //   try {
// // //     await sequelize.authenticate();
// // //     console.log("✅ Database connected successfully");
// // //     await sequelize.sync({ alter: true });
// // //     console.log("✅ Database synced successfully");
// // //   } catch (err) {
// // //     console.error("❌ Database sync error:", err);
// // //   }
// // // };
// // // syncDatabase();

// // // // JWT Token Middleware
// // // const verifyAuthToken = (req, res, next) => {
// // //   const token = req.header("Authorization");
// // //   if (!token) return res.status(403).json({ success: false, message: "No token provided" });

// // //   try {
// // //     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
// // //     req.userId = decoded.userId;
// // //     next();
// // //   } catch (err) {
// // //     res.status(401).json({ success: false, message: "Invalid or expired token" });
// // //   }
// // // };

// // // // Signup Route
// // // app.post("/api/signup", async (req, res) => {
// // //   try {
// // //     const {
// // //       username, email, password, age,
// // //       address, phone, state, district,
// // //       pincode, batteryId,
// // //     } = req.body;

// // //     // Validation
// // //     if (!username || !email || !password || !age || !address || !phone || !state || !district || !pincode || !batteryId) {
// // //       return res.status(400).json({ success: false, message: "All fields are required" });
// // //     }

// // //     const existingUser = await User.findOne({ where: { email } });
// // //     if (existingUser) {
// // //       return res.status(400).json({ success: false, message: "Email already registered" });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);
// // //     const newUserId = uuidv4();

// // //     const newUser = await User.create({
// // //       userId: newUserId,
// // //       username,
// // //       email,
// // //       password: hashedPassword,
// // //       age,
// // //       address,
// // //       phone,
// // //       state,
// // //       district,
// // //       pincode,
// // //       batteryId,
// // //     });

// // //     res.status(201).json({
// // //       success: true,
// // //       message: "User registered successfully",
// // //       userId: newUser.userId,
// // //     });
// // //   } catch (error) {
// // //     console.error("Signup Error:", error);
// // //     res.status(500).json({ success: false, message: "Registration failed", error: error.message });
// // //   }
// // // });

// // // // Login Route
// // // app.post("/api/login", async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const user = await User.findOne({ where: { email } });

// // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // //       return res.status(401).json({ message: "Invalid email or password" });
// // //     }

// // //     const token = jwt.sign(
// // //       { userId: user.userId, email: user.email, username: user.username },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "1d" }
// // //     );

// // //     res.status(200).json({ message: "Login successful", token, user });
// // //   } catch (error) {
// // //     console.error("Login error:", error);
// // //     res.status(500).json({ message: "Server error", error: error.message });
// // //   }
// // // });

// // // router.get("/verify-token", verifyAuthToken, (req, res) => {
// // //   res.json({
// // //     success: true,
// // //     user: {
// // //       userId: req.user.userId,
// // //       email: req.user.email,
// // //       username: req.user.name,
// // //     },
// // //   });
// // // });

// // // // Check Email Availability
// // // app.post("/api/check-email", async (req, res) => {
// // //   try {
// // //     const { email } = req.body;
// // //     const user = await User.findOne({ where: { email } });

// // //     if (user) {
// // //       return res.status(400).json({ success: false, message: "Email already exists" });
// // //     }

// // //     res.status(200).json({ success: true, message: "Email available" });
// // //   } catch (error) {
// // //     console.error("Check Email Error:", error);
// // //     res.status(500).json({ success: false, message: "Server error", error: error.message });
// // //   }
// // // });

// // // // Token-Based Protected Example
// // // app.get("/api/protected", verifyToken, (req, res) => {
// // //   res.json({ success: true, message: "Access granted", userId: req.userId });
// // // });

// // // // User Info From Token
// // // app.get("/login/user", verifyToken, async (req, res) => {
// // //   try {
// // //     const decoded = jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET);
// // //     res.json({ success: true, message: "Access granted", userId: decoded.userId });
// // //   } catch (err) {
// // //     res.status(404).json({ success: false, message: "Invalid or expired token" });
// // //   }
// // // });

// // // // Route Imports
// // // app.use("/api", require("./routes/authRoutes"));
// // // app.use("/api", require("./routes/bmsRoutes"));
// // // const bmsRoutes = require('./routes/bmsRoutes');
// // // app.use('/api', bmsRoutes);
// // // app.use("/api/battery", require("./routes/battery.js"));
// // // app.use("/api", require("./routes/userlogin.js"));
// // // app.use("/api/profile", require("./routes/userProfile.js"));
// // // app.use("/api", require("./routes/userStatusUpdate.js"));
// // // app.use("/api", require("./routes/historyRoute"));
// // // app.use("/api", require("./routes/RealtimeRoute"));
// // // app.use("/api", require("./routes/loginDetail"));
// // // app.use("/api", require("./routes/loginDetail1"));
// // // app.use("/api/equilibrium", require("./routes/equilibriumRoutes"));
// // // app.use("/api/admin", require("./routes/aadminRoute"));
// // // app.use("/api", require("./routes/BatteryDataRoute"));
// // // app.use("/api", require("./routes/parameterRoutes"));
// // // app.use("/api", require("./routes/parameterRoutes2"));
// // // const batteryRoutes = require('./routes/userbatteryRoute');
// // // app.use('/api/battery', batteryRoutes);
// // // app.use("/api", require("./routes/BatteryMonitorRoute"));
// // // app.use("/api/admin", require("./routes/AtechRoute"));
// // // app.use("/api/admin", require("./routes/Atech2Route"));
// // // app.use("/api", require("./routes/auserdRoute"));
// // // app.use("/api/technician", require("./routes/technicianRoute"));
// // // app.use("/api/admin", require("./routes/AuserRoute"));
// // // app.use("/api/admin", require("./routes/TechnicianDelete"));
// // // app.use("/api/admin", require("./routes/userBatteryDel"));
// // // app.use("/api", require("./routes/AbatteryHealth"));
// // // app.use("/api/warranty", require("./routes/warrantyRoutes"));
// // // app.use("/api/warranty", require("./routes/AdminWRoute"));
// // // app.use("/api/warranty", require("./routes/warrantyUpdateRoute"));
// // // app.use("/api/warranty", require("./routes/techWarrantyVerify"));
// // // app.use("/api/admin", require("./routes/adminRoutes"));
// // // app.use("/api/user", require("./routes/userRoutes"));
// // // app.use("/api/technician", require("./routes/technicianRoutes"));

// // // // Start Server
// // // app.listen(PORT, "0.0.0.0", () => {
// // //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // //  });
// // // // require("dotenv").config();
// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const session = require("express-session");
// // // // const SequelizeStore = require("connect-session-sequelize")(session.Store);
// // // // const { Sequelize, DataTypes } = require("sequelize");
// // // // const bcrypt = require("bcryptjs");
// // // // const jwt = require("jsonwebtoken");
// // // // const { v4: uuidv4 } = require("uuid");
// // // // const db = require("./config/db");

// // // // const app = express();
// // // // const PORT = process.env.PORT || 5000;

// // // // const sequelize = new Sequelize(
// // // //   process.env.MYSQL_DB,
// // // //   process.env.MYSQL_USER,
// // // //   process.env.MYSQL_PASSWORD,
// // // //   {
// // // //     host: process.env.MYSQL_HOST,
// // // //     dialect: "mysql",
// // // //     logging: false,
// // // //   }
// // // // );

// // // // const sessionStore = new SequelizeStore({
// // // //   db: sequelize,
// // // //   tableName: "Sessions",
// // // //   checkExpirationInterval: 15 * 60 * 1000,
// // // //   expiration: 24 * 60 * 60 * 1000,
// // // // });

// // // // app.use(
// // // //   cors({
// // // //     origin: "http://localhost:3000",
// // // //     methods: ["GET", "POST", "PUT", "DELETE"],
// // // //     allowedHeaders: ["Content-Type", "Authorization"],
// // // //     credentials: true,
// // // //   })
// // // // );
// // // // app.use(express.json({ limit: "10mb" }));
// // // // app.use(
// // // //   session({
// // // //     secret: process.env.SESSION_SECRET || "your-secret-key",
// // // //     store: sessionStore,
// // // //     resave: false,
// // // //     saveUninitialized: false,
// // // //     cookie: {
// // // //       httpOnly: true,
// // // //       secure: process.env.NODE_ENV === "production",
// // // //       maxAge: 24 * 60 * 60 * 1000,
// // // //     },
// // // //   })
// // // // );

// // // // const User = sequelize.define("User", {
// // // //   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
// // // //   userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
// // // //   username: { type: DataTypes.STRING, allowNull: false },
// // // //   email: { type: DataTypes.STRING, allowNull: false, unique: true },
// // // //   password: { type: DataTypes.STRING, allowNull: false },
// // // //   age: { type: DataTypes.INTEGER, allowNull: false },
// // // //   address: { type: DataTypes.STRING, allowNull: false },
// // // //   phone: { type: DataTypes.STRING, allowNull: false },
// // // //   state: { type: DataTypes.STRING, allowNull: false },
// // // //   district: { type: DataTypes.STRING, allowNull: false },
// // // //   pincode: { type: DataTypes.STRING, allowNull: false },
// // // //   batteryId: { type: DataTypes.STRING, allowNull: false },
// // // //   role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
// // // //   status: { type: Sequelize.STRING, defaultValue: "requested" },
// // // // });

// // // // const syncDatabase = async () => {
// // // //   try {
// // // //     await sequelize.authenticate();
// // // //     console.log("✅ Database connected successfully");
// // // //     await sequelize.sync({ alter: true });
// // // //     await sessionStore.sync();
// // // //     console.log("✅ Database and session store synced successfully");
// // // //   } catch (err) {
// // // //     console.error("❌ Database sync error:", err);
// // // //   }
// // // // };
// // // // syncDatabase();

// // // // const verifyToken = (req, res, next) => {
// // // //   const token = req.header("Authorization");
// // // //   if (!token) return res.status(403).json({ success: false, message: "No token provided" });

// // // //   try {
// // // //     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
// // // //     req.userId = decoded.userId;
// // // //     next();
// // // //   } catch (err) {
// // // //     res.status(401).json({ success: false, message: "Invalid or expired token" });
// // // //   }
// // // // };

// // // // app.post("/api/signup", async (req, res) => {
// // // //   try {
// // // //     const {
// // // //       username, email, password, age,
// // // //       address, phone, state, district,
// // // //       pincode, batteryId,
// // // //     } = req.body;

// // // //     if (!username || !email || !password || !age || !address || !phone || !state || !district || !pincode || !batteryId) {
// // // //       return res.status(400).json({ success: false, message: "All fields are required" });
// // // //     }

// // // //     const existingUser = await User.findOne({ where: { email } });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ success: false, message: "Email already registered" });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const newUserId = uuidv4();

// // // //     const newUser = await User.create({
// // // //       userId: newUserId,
// // // //       username,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       age,
// // // //       address,
// // // //       phone,
// // // //       state,
// // // //       district,
// // // //       pincode,
// // // //       batteryId,
// // // //     });

// // // //     res.status(201).json({
// // // //       success: true,
// // // //       message: "User registered successfully",
// // // //       userId: newUser.userId,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Signup Error:", error);
// // // //     res.status(500).json({ success: false, message: "Registration failed", error: error.message });
// // // //   }
// // // // });

// // // // app.post("/api/login", async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;
// // // //     const user = await User.findOne({ where: { email } });

// // // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // // //       return res.status(401).json({ message: "Invalid email or password" });
// // // //     }

// // // //     req.session.userId = user.userId;

// // // //     const token = jwt.sign(
// // // //       { userId: user.userId, email: user.email, username: user.username },
// // // //       process.env.JWT_SECRET,
// // // //       { expiresIn: "1h" }
// // // //     );

// // // //     res.status(200).json({ message: "Login successful", token, user });
// // // //   } catch (error) {
// // // //     console.error("Login error:", error);
// // // //     res.status(500).json({ message: "Server error", error: error.message });
// // // //   }
// // // // });

// // // // app.post("/api/check-email", async (req, res) => {
// // // //   try {
// // // //     const { email } = req.body;
// // // //     const user = await User.findOne({ where: { email } });

// // // //     if (user) {
// // // //       return res.status(400).json({ success: false, message: "Email already exists" });
// // // //     }

// // // //     res.status(200).json({ success: true, message: "Email available" });
// // // //   } catch (error) {
// // // //     console.error("Check Email Error:", error);
// // // //     res.status(500).json({ success: false, message: "Server error", error: error.message });
// // // //   }
// // // // });

// // // // app.get("/api/protected", verifyToken, (req, res) => {
// // // //   res.json({ success: true, message: "Access granted", userId: req.userId });
// // // // });

// // // // app.get("/login/user", verifyToken, async (req, res) => {
// // // //   try {
// // // //     const decoded = jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET);
// // // //     res.json({ success: true, message: "Access granted", userId: decoded.userId });
// // // //   } catch (err) {
// // // //     res.status(404).json({ success: false, message: "Invalid or expired token" });
// // // //   }
// // // // });

// // // // app.use("/api", require("./routes/authRoutes"));
// // // // app.use("/api", require("./routes/bmsRoutes"));
// // // // const bmsRoutes = require('./routes/bmsRoutes');
// // // // app.use('/api', bmsRoutes);

// // // // app.use("/api", require("./routes/userlogin.js"));
// // // // app.use("/api/profile", require("./routes/userProfile.js"));
// // // // app.use("/api", require("./routes/userStatusUpdate.js"));
// // // // app.use("/api", require("./routes/historyRoute"));
// // // // app.use("/api", require("./routes/RealtimeRoute"));
// // // // app.use("/api", require("./routes/loginDetail"));
// // // // app.use("/api", require("./routes/loginDetail1"));
// // // // app.use("/api/equilibrium", require("./routes/equilibriumRoutes"));
// // // // app.use("/api/admin", require("./routes/aadminRoute"));
// // // // app.use("/api", require("./routes/BatteryDataRoute"));
// // // // app.use("/api", require("./routes/parameterRoutes"));
// // // // app.use("/api", require("./routes/parameterRoutes2"));
// // // // app.use("/api", require("./routes/BatteryMonitorRoute"));
// // // // app.use("/api/admin", require("./routes/AtechRoute"));
// // // // app.use("/api/admin", require("./routes/Atech2Route"));
// // // // app.use("/api", require("./routes/auserdRoute"));
// // // // app.use("/api/technician", require("./routes/technicianRoute"));
// // // // app.use("/api/admin", require("./routes/AuserRoute"));
// // // // app.use("/api/admin", require("./routes/TechnicianDelete"));
// // // // app.use("/api/admin", require("./routes/userBatteryDel"));
// // // // app.use("/api", require("./routes/AbatteryHealth"));
// // // // app.use("/api/warranty", require("./routes/warrantyRoutes"));
// // // // app.use("/api/warranty", require("./routes/AdminWRoute"));
// // // // app.use("/api/warranty", require("./routes/warrantyUpdateRoute"));
// // // // app.use("/api/warranty", require("./routes/techWarrantyVerify"));
// // // // app.use("/api/admin", require("./routes/adminRoutes"));
// // // // app.use("/api/user", require("./routes/userRoutes"));
// // // // app.use("/api/technician", require("./routes/technicianRoutes"));

// // // // app.listen(PORT, "0.0.0.0", () => {
// // // //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // // // });

// // app.use("/api", require("./routes/userlogin.js"));
// // app.use("/api/profile", require("./routes/userProfile.js"));
// // app.use("/api", require("./routes/userStatusUpdate.js"));
// // app.use("/api", require("./routes/historyRoute"));
// // app.use("/api", require("./routes/RealtimeRoute"));
// // app.use("/api", require("./routes/loginDetail"));
// // app.use("/api", require("./routes/loginDetail1"));
// // app.use("/api/equilibrium", require("./routes/equilibriumRoutes"));
// // app.use("/api/admin", require("./routes/aadminRoute"));
// // app.use("/api", require("./routes/BatteryDataRoute"));
// // app.use("/api", require("./routes/parameterRoutes"));
// // app.use("/api", require("./routes/parameterRoutes2"));
// // app.use("/api", require("./routes/BatteryMonitorRoute"));
// // app.use("/api/admin", require("./routes/AtechRoute"));
// // app.use("/api/admin", require("./routes/Atech2Route"));
// // app.use("/api", require("./routes/auserdRoute"));
// // app.use("/api/technician", require("./routes/technicianRoute"));
// // app.use("/api/admin", require("./routes/AuserRoute"));
// // app.use("/api/admin", require("./routes/TechnicianDelete"));
// // app.use("/api/admin", require("./routes/userBatteryDel"));
// // app.use("/api", require("./routes/AbatteryHealth"));
// // app.use("/api/warranty", require("./routes/warrantyRoutes"));
// // app.use("/api/warranty", require("./routes/AdminWRoute"));
// // app.use("/api/warranty", require("./routes/warrantyUpdateRoute"));
// // app.use("/api/warranty", require("./routes/techWarrantyVerify"));
// // app.use("/api/admin", require("./routes/adminRoutes"));
// // app.use("/api/user", require("./routes/userRoutes"));
// // app.use("/api/technician", require("./routes/technicianRoutes"));

// // // Start Server
// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// //  });



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
// const db = require("./config/db"); // DB config (if needed elsewhere)

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "10mb" }));
// //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));
// // Sequelize Database Configuration
// const sequelize = new Sequelize(
//   process.env.MYSQL_DB,
//   process.env.MYSQL_USER,
//   process.env.MYSQL_PASSWORD,
//   {
//     host: process.env.MYSQL_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// // User Model
// const User = sequelize.define("User", {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
//   username: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
//   password: { type: DataTypes.STRING, allowNull: false },
//   age: { type: DataTypes.INTEGER, allowNull: false },
//   address: { type: DataTypes.STRING, allowNull: false },
//   phone: { type: DataTypes.STRING, allowNull: false },
//   state: { type: DataTypes.STRING, allowNull: false },
//   district: { type: DataTypes.STRING, allowNull: false },
//   pincode: { type: DataTypes.STRING, allowNull: false },
//   batteryId: { type: DataTypes.STRING, allowNull: false },
//   role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
//   status: { type: Sequelize.STRING, defaultValue: "requested" },
// });

// // Sync Database
// const syncDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected successfully");
//     await sequelize.sync({ alter: true });
//     console.log("✅ Database synced successfully");
//   } catch (err) {
//     console.error(" Database sync error:", err);
//   }
// };
// syncDatabase();

// // JWT Token Middleware
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(403).json({ success: false, message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// // Signup Route
// app.post("/api/signup", async (req, res) => {
//   try {
//     const {
//       username, email, password, age,
//       address, phone, state, district,
//       pincode, batteryId,
//     } = req.body;

//     // Validation
//     if (!username || !email || !password || !age || !address || !phone || !state || !district || !pincode || !batteryId) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUserId = uuidv4();

//     const newUser = await User.create({
//       userId: newUserId,
//       username,
//       email,
//       password: hashedPassword,
//       age,
//       address,
//       phone,
//       state,
//       district,
//       pincode,
//       batteryId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       userId: newUser.userId,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ success: false, message: "Registration failed", error: error.message });
//   }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { userId: user.userId, email: user.email, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({ message: "Login successful", token, user });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Check Email Availability
// app.post("/api/check-email", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (user) {
//       return res.status(400).json({ success: false, message: "Email already exists" });
//     }

//     res.status(200).json({ success: true, message: "Email available" });
//   } catch (error) {
//     console.error("Check Email Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // Token-Based Protected Example
// app.get("/api/protected", verifyToken, (req, res) => {
//   res.json({ success: true, message: "Access granted", userId: req.userId });
// });

// // User Info From Token
// app.get("/login/user", verifyToken, async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET);
//     res.json({ success: true, message: "Access granted", userId: decoded.userId });
//   } catch (err) {
//     res.status(404).json({ success: false, message: "Invalid or expired token" });
//   }
// });

// // Route Imports
// app.use("/api", require("./routes/authRoutes"));
// app.use("/api", require("./routes/bmsRoutes"));
// const bmsRoutes = require('./routes/bmsRoutes');
// app.use('/api', bmsRoutes);
// //app.use("/api/battery", require("./routes/battery.js"));
// app.use("/api", require("./routes/userlogin.js"));
// app.use("/api/profile", require("./routes/userProfile.js"));
// app.use("/api", require("./routes/userStatusUpdate.js"));
// app.use("/api", require("./routes/historyRoute"));
// app.use("/api", require("./routes/RealtimeRoute"));
// app.use("/api", require("./routes/loginDetail"));
// app.use("/api", require("./routes/loginDetail1"));
// app.use("/api/equilibrium", require("./routes/equilibriumRoutes"));
// app.use("/api/admin", require("./routes/aadminRoute"));
// app.use("/api", require("./routes/BatteryDataRoute"));
// app.use("/api", require("./routes/parameterRoutes"));
// app.use("/api", require("./routes/parameterRoutes2"));
// const batteryRoutes = require('./routes/userbatteryRoute');
// //app.use('/api/battery', batteryRoutes);
// app.use("/api", require("./routes/BatteryMonitorRoute"));
// app.use("/api/admin", require("./routes/AtechRoute"));
// app.use("/api/admin", require("./routes/Atech2Route"));
// app.use("/api", require("./routes/auserdRoute"));
// app.use("/api/technician", require("./routes/technicianRoute"));
// app.use("/api/admin", require("./routes/AuserRoute"));
// app.use("/api/admin", require("./routes/TechnicianDelete"));
// app.use("/api/admin", require("./routes/userBatteryDel"));
// app.use("/api", require("./routes/AbatteryHealth"));
// app.use("/api/warranty", require("./routes/warrantyRoutes"));
// app.use("/api/warranty", require("./routes/AdminWRoute"));
// app.use("/api/warranty", require("./routes/warrantyUpdateRoute"));
// app.use("/api/warranty", require("./routes/techWarrantyVerify"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/technician", require("./routes/technicianRoutes"));

// // Start Server
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//  });

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path"); // Added for proper path handling

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "10mb" }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Use path.join for cross-platform compatibility

// // Sequelize Database Configuration
// const sequelize = new Sequelize(
//   process.env.MYSQL_DB,
//   process.env.MYSQL_USER,
//   process.env.MYSQL_PASSWORD,
//   {
//     host: process.env.MYSQL_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// // User Model
// const User = sequelize.define(
//   "User",
//   {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
//     username: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     age: { type: DataTypes.INTEGER, allowNull: false },
//     address: { type: DataTypes.STRING, allowNull: false },
//     phone: { type: DataTypes.STRING, allowNull: false },
//     state: { type: DataTypes.STRING, allowNull: false },
//     district: { type: DataTypes.STRING, allowNull: false },
//     pincode: { type: DataTypes.STRING, allowNull: false },
//     batteryId: { type: DataTypes.STRING, allowNull: false },
//     role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
//     status: { type: DataTypes.STRING, defaultValue: "requested" },
//   },
//   { tableName: "Users" } // Explicitly set table name to avoid pluralization issues
// );

// // Sync Database
// const syncDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected successfully");
//     await sequelize.sync({ alter: true });
//     console.log("✅ Database synced successfully");
//   } catch (err) {
//     console.error("❌ Database sync error:", err);
//   }
// };
// syncDatabase();

// // JWT Token Middleware
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(403).json({ success: false, message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// // Signup Route
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { username, email, password, age, address, phone, state, district, pincode, batteryId } = req.body;

//     // Validation
//     if (!username || !email || !password || !age || !address || !phone || !state || !district || !pincode || !batteryId) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUserId = uuidv4();

//     const newUser = await User.create({
//       userId: newUserId,
//       username,
//       email,
//       password: hashedPassword,
//       age,
//       address,
//       phone,
//       state,
//       district,
//       pincode,
//       batteryId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       userId: newUser.userId,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ success: false, message: "Registration failed", error: error.message });
//   }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { userId: user.userId, email: user.email, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({ message: "Login successful", token, user });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Check Email Availability
// app.post("/api/check-email", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (user) {
//       return res.status(400).json({ success: false, message: "Email already exists" });
//     }

//     res.status(200).json({ success: true, message: "Email available" });
//   } catch (error) {
//     console.error("Check Email Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // Token-Based Protected Example
// app.get("/api/protected", verifyToken, (req, res) => {
//   res.json({ success: true, message: "Access granted", userId: req.userId });
// });

// // User Info From Token
// app.get("/login/user", verifyToken, async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET);
//     res.json({ success: true, message: "Access granted", userId: decoded.userId });
//   } catch (err) {
//     res.status(404).json({ success: false, message: "Invalid or expired token" });
//   }
// });

// // Route Imports

// app.use("/api", require("./routes/authRoutes"));
// app.use("/api", require("./routes/bmsRoutes"));
// app.use("/api", require("./routes/userlogin"));
// app.use("/api/profile", require("./routes/userProfile"));
// app.use("/api", require("./routes/userStatusUpdate"));
// app.use("/api", require("./routes/historyRoute"));
// app.use("/api", require("./routes/RealtimeRoute"));
// app.use("/api", require("./routes/loginDetail"));
// app.use("/api", require("./routes/loginDetail1"));
// app.use("/api/equilibrium", require("./routes/equilibriumRoutes"));
// app.use("/api/admin", require("./routes/aadminRoute"));
// //app.use("/api", require("./routes/BatteryDataRoute"));
// app.use("/api", require("./routes/parameterRoutes"));
// app.use("/api", require("./routes/parameterRoutes2"));
// app.use("/api/battery", require("./routes/userbatteryRoute"));
// app.use("/api", require("./routes/BatteryMonitorRoute"));
// app.use("/api/admin", require("./routes/AtechRoute"));
// app.use("/api/admin", require("./routes/Atech2Route"));
// app.use("/api", require("./routes/auserdRoute"));
// app.use("/api/technician", require("./routes/technicianRoute"));
// app.use("/api/admin", require("./routes/AuserRoute"));
// app.use("/api/admin", require("./routes/TechnicianDelete"));
// app.use("/api/admin", require("./routes/userBatteryDel"));
// app.use("/api", require("./routes/AbatteryHealth"));
// app.use("/api/warranty", require("./routes/warrantyRoutes"));
// app.use("/api/warranty", require("./routes/AdminWRoute"));
// app.use("/api/warranty", require("./routes/warrantyUpdateRoute"));
// app.use("/api/warranty", require("./routes/techWarrantyVerify"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/technician", require("./routes/technicianRoutes"));

// // Start Server
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const mqtt = require("mqtt");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Sequelize Database Configuration
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// User Model
const User = sequelize.define(
  "User",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    pincode: { type: DataTypes.STRING, allowNull: false },
    batteryId: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    status: { type: DataTypes.STRING, defaultValue: "requested" },
  },
  { tableName: "Users" }
);

// Sync Database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");
  } catch (err) {
    console.error("❌ Database sync error:", err);
  }
};
syncDatabase();

// JWT Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// UART Setup
const SERIAL_PORT = "COM4"; // Adjust as needed
let serialPort;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

const initializeSerialPort = () => {
  serialPort = new SerialPort({
    path: SERIAL_PORT,
    baudRate: 9600,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    autoOpen: false,
  });

  const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));
  console.log()
  parser.on("data", (data) => {
    const message = data.trim();
    try {
      const parsedData = JSON.parse(message);
      console.log("UART data received (parsed):", parsedData);
    } catch (e) {
      //console.log("UART data received (raw):", parsedData);
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    mqttClient.publish("esp32/data", message, { qos: 1 }, (err) => {
      if (err) console.error("❌ MQTT publish error:", err);
    });
  });

  serialPort.on("error", (err) => {
    console.error("❌ Serial port error:", err.message);
    reconnectSerialPort();
  });

  serialPort.on("close", () => {
    console.log("Serial port closed unexpectedly. Reconnecting...");
    reconnectSerialPort();
  });
};

const connectSerialPort = () => {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error("❌ Max reconnect attempts reached. Please check serial port configuration.");
    return;
  }

  serialPort.open((err) => {
    if (err) {
      console.error(`❌ Error opening serial port ${SERIAL_PORT}:`, err.message);
      reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000); // Exponential backoff, max 30s
      console.log(`Retrying in ${delay / 1000} seconds... (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
      setTimeout(connectSerialPort, delay);
      return;
    }
    console.log(`✅ Serial port ${SERIAL_PORT} opened`);
    reconnectAttempts = 0; // Reset attempts on success
  });
};

// List available serial ports on startup
SerialPort.list()
  .then((ports) => {
    console.log("Available serial ports:", ports.map((p) => ({ path: p.path, manufacturer: p.manufacturer })));
    if (!ports.find((p) => p.path === SERIAL_PORT)) {
      console.error(`❌ Serial port ${SERIAL_PORT} not found. Available ports:`, ports.map((p) => p.path));
    }
    initializeSerialPort();
    connectSerialPort();
  })
  .catch((err) => {
    console.error("❌ Error listing serial ports:", err);
    initializeSerialPort();
    connectSerialPort();
  });

// MQTT Setup
const mqttClient = mqtt.connect({
  protocol: "wss",
  host: "17df3ae464af44dabae01a271cfe6598.s1.eu.hivemq.cloud",
  port: 8884,
  path: "/mqtt",
  username: "Harshini_",
  password: "Harshini@21ee",
  rejectUnauthorized: false,
});

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  mqttClient.subscribe("esp32/control", { qos: 1 }, (err) => {
    if (err) console.error("❌ MQTT subscribe error:", err);
  });
});

mqttClient.on("message", (topic, message) => {
  if (topic === "esp32/control") {
    try {
      const data = JSON.parse(message.toString());
      console.log("Received MQTT control message:", data);
      if (serialPort && serialPort.isOpen) {
        serialPort.write(JSON.stringify(data) + "\n", (err) => {
          if (err) console.error("❌ Error writing to UART:", err.message);
        });
      } else {
        console.error("❌ Serial port not open. Cannot write to UART.");
      }
    } catch (err) {
      console.error("❌ MQTT message parse error:", err.message);
    }
  }
});

mqttClient.on("error", (err) => {
  console.error("❌ MQTT error:", err);
});

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("✅ WebSocket client connected");
  ws.on("message", (message) => {
    try {
      mqttClient.publish("esp32/control", message.toString(), { qos: 1 });
    } catch (err) {
      console.error("❌ WebSocket message error:", err.message);
    }
  });
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
  ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err.message);
  });
});

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password, age, address, phone, state, district, pincode, batteryId } = req.body;

    if (!username || !email || !password || !age || !address || !phone || !state || !district || !pincode || !batteryId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = uuidv4();

    const newUser = await User.create({
      userId: newUserId,
      username,
      email,
      password: hashedPassword,
      age,
      address,
      phone,
      state,
      district,
      pincode,
      batteryId,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser.userId,
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ success: false, message: "Registration failed", error: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Check Email Availability
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    res.status(200).json({ success: true, message: "Email available" });
  } catch (error) {
    console.error("❌ Check Email Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Token-Based Protected Example
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ success: true, message: "Access granted", userId: req.userId });
});

// User Info From Token
app.get("/login/user", verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET);
    res.json({ success: true, message: "Access granted", userId: decoded.userId });
  } catch (err) {
    res.status(404).json({ success: false, message: "Invalid or expired token" });
  }
});

// Battery Parameter Route
app.post("/api/battery/parameter", verifyToken, async (req, res) => {
  try {
    const { email, parameterGroup, ...parameters } = req.body;
    console.log("Received HTTP parameter:", { email, parameterGroup, parameters });
    if (!serialPort || !serialPort.isOpen) {
      console.error("❌ Serial port not open");
      return res.status(500).json({ error: "Serial port not available" });
    }
    serialPort.write(JSON.stringify({ parameterGroup, ...parameters }) + "\n", (err) => {
      if (err) {
        console.error("❌ Error writing to UART:", err.message);
        return res.status(500).json({ error: "Failed to set parameters" });
      }
      res.json({ message: "Parameters set successfully" });
    });
  } catch (error) {
    console.error("❌ Parameter route error:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

// Consolidated Route Imports
const apiRouter = express.Router();
const routes = [
  "./routes/authRoutes",
  "./routes/bmsRoutes",
  "./routes/userlogin",
  "./routes/userStatusUpdate",
  "./routes/historyRoute",
  "./routes/RealtimeRoute",
  "./routes/loginDetail",
  "./routes/loginDetail1",
  "./routes/parameterRoutes",
  "./routes/parameterRoutes2",
  "./routes/BatteryMonitorRoute",
  "./routes/auserdRoute",
  "./routes/AbatteryHealth",
];
const adminRouter = express.Router();
const adminRoutes = [
  "./routes/aadminRoute",
  "./routes/AtechRoute",
  "./routes/Atech2Route",
  "./routes/AuserRoute",
  "./routes/TechnicianDelete",
  "./routes/userBatteryDel",
  "./routes/adminRoutes",
];
const profileRouter = express.Router();
const warrantyRouter = express.Router();
const technicianRouter = express.Router();

routes.forEach((route) => {
  try {
    apiRouter.use(require(route));
  } catch (err) {
    console.error(`❌ Error loading route ${route}:`, err.message);
  }
});
adminRoutes.forEach((route) => {
  try {
    adminRouter.use(require(route));
  } catch (err) {
    console.error(`❌ Error loading admin route ${route}:`, err.message);
  }
});
profileRouter.use(require("./routes/userProfile"));
warrantyRouter.use(require("./routes/warrantyRoutes"));
warrantyRouter.use(require("./routes/AdminWRoute"));
warrantyRouter.use(require("./routes/warrantyUpdateRoute"));
warrantyRouter.use(require("./routes/techWarrantyVerify"));
technicianRouter.use(require("./routes/technicianRoute"));
technicianRouter.use(require("./routes/technicianRoutes"));
apiRouter.use("/battery", require("./routes/userbatteryRoute"));
app.use("/api", apiRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", profileRouter);
app.use("/api/warranty", warrantyRouter);
app.use("/api/technician", technicianRouter);

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});