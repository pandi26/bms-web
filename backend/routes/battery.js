
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { QueryTypes } = require('sequelize');
// const sequelize = require('../config/db');

// // Ensure upload directory exists
// const uploadDir = path.join(__dirname, '../Uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   fs.chmodSync(uploadDir, 0o755);
// }

// // Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     cb(null, `battery-${Date.now()}${ext}`);
//   },
// });

// // Multer upload
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       console.log('Invalid file type:', file.mimetype, file.originalname);
//       cb(new Error('Only JPEG, PNG, GIF, or WebP images are allowed'), false);
//     }
//   },
// });

// // Multer error handler
// const handleMulterError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     console.error('Multer error:', err.message);
//     return res.status(400).json({ error: `Upload error: ${err.message}` });
//   }
//   if (err) {
//     console.error('File upload error:', err.message);
//     return res.status(400).json({ error: err.message });
//   }
//   next();
// };

// // Check battery ID
// router.get('/check/:batteryId', async (req, res) => {
//   const { batteryId } = req.params;
//   try {
//     const [battery] = await sequelize.query(
//       `SELECT battery_id FROM batteries WHERE battery_id = :batteryId`,
//       { replacements: { batteryId }, type: QueryTypes.SELECT }
//     );
//     res.json({ exists: !!battery });
//   } catch (err) {
//     console.error('Error checking battery ID:', err);
//     res.status(500).json({ error: 'Failed to check battery ID' });
//   }
// });

// // Get battery by ID
// router.get('/by-battery/:batteryId', async (req, res) => {
//   const { batteryId } = req.params;
//   try {
//     const [battery] = await sequelize.query(
//       `SELECT b.battery_id, b.user_id, b.image_url AS imageUrl, 
//               b.purchase_date AS purchaseDate, b.order_id AS orderId, 
//               b.price, b.warranty_end AS warrantyEnd,
//               s.capacity, s.type, s.voltage, s.weight, s.\`range\`, s.\`warranty\`
//        FROM batteries b
//        LEFT JOIN battery_specs s ON b.battery_id = s.battery_id
//        WHERE b.battery_id = :batteryId`,
//       { replacements: { batteryId }, type: QueryTypes.SELECT }
//     );

//     if (!battery) {
//       return res.status(404).json({ error: `No battery found for ID ${batteryId}` });
//     }

//     const response = {
//       battery_id: battery.battery_id,
//       user_id: battery.user_id,
//       imageUrl: battery.imageUrl || null,
//       purchaseDetails: {
//         purchaseDate: battery.purchaseDate || null,
//         orderId: battery.orderId || null,
//         price: parseFloat(battery.price) || null,
//         warrantyEnd: battery.warrantyEnd || null,
//       },
//       specs: {
//         capacity: battery.capacity || null,
//         type: battery.type || null,
//         voltage: battery.voltage || null,
//         weight: battery.weight || null,
//         range: battery.range || null,
//         warranty: battery.warranty ? parseInt(battery.warranty) : null,
//       },
//     };

//     console.log('Battery fetched:', response);
//     res.json(response);
//   } catch (err) {
//     console.error('Error fetching battery:', err);
//     res.status(500).json({ error: 'Failed to fetch battery: ' + err.message });
//   }
// });

// // Upload image
// router.post('/upload', upload.single('batteryImage'), handleMulterError, async (req, res) => {
//   const { userId, batteryId } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ error: 'No image file uploaded' });
//   }

//   try {
//     const imageUrl = `http://localhost:5000/Uploads/${req.file.filename}`; // Capital 'U' in Uploads
//     fs.chmodSync(req.file.path, 0o644);
//     console.log('Image uploaded:', { userId, batteryId: batteryId || 'temp-id', imageUrl });
//     res.status(200).json({ imageUrl });
//   } catch (err) {
//     console.error('Error uploading image:', err.message);
//     res.status(500).json({ error: 'Failed to upload image: ' + err.message });
//   }
// });

// // Add battery
// router.post('/add', async (req, res) => {
//   const { userId, batteryId, imageUrl, specs, purchaseDetails } = req.body;

//   if (!userId || !batteryId) {
//     return res.status(400).json({ error: 'User ID and Battery ID are required' });
//   }

//   if (imageUrl && !imageUrl.startsWith('http://localhost:5000/Uploads/')) {
//     return res.status(400).json({ error: 'Invalid image URL' });
//   }

//   const defaultSpecs = {
//     capacity: '50 kWh',
//     type: 'Lithium-ion',
//     voltage: '400 V',
//     weight: '500 kg',
//     range: '300 km',
//     warranty: '8',
//   };

//   const defaultPurchaseDetails = {
//     purchaseDate: new Date().toISOString().split('T')[0],
//     orderId: `ORD-${Date.now()}`,
//     price: '5000.00',
//     warrantyEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 8)).toISOString().split('T')[0],
//   };

//   const finalSpecs = { ...defaultSpecs, ...specs };
//   const finalPurchaseDetails = { ...defaultPurchaseDetails, ...purchaseDetails };
//   const price = parseFloat(finalPurchaseDetails.price) || defaultPurchaseDetails.price;

//   try {
//     const [existingBattery] = await sequelize.query(
//       `SELECT battery_id FROM batteries WHERE battery_id = :batteryId`,
//       { replacements: { batteryId }, type: QueryTypes.SELECT }
//     );

//     if (existingBattery) {
//       return res.status(400).json({ error: `Battery ID '${batteryId}' already exists` });
//     }

//     await sequelize.transaction(async (t) => {
//       await sequelize.query(
//         `INSERT INTO batteries (user_id, battery_id, image_url, purchase_date, order_id, price, warranty_end, created_at)
//          VALUES (:userId, :batteryId, :imageUrl, :purchaseDate, :orderId, :price, :warrantyEnd, NOW())`,
//         {
//           replacements: {
//             userId,
//             batteryId,
//             imageUrl: imageUrl || null,
//             purchaseDate: finalPurchaseDetails.purchaseDate || null,
//             orderId: finalPurchaseDetails.orderId || null,
//             price,
//             warrantyEnd: finalPurchaseDetails.warrantyEnd || null,
//           },
//           type: QueryTypes.INSERT,
//           transaction: t,
//         }
//       );

//       await sequelize.query(
//         `INSERT INTO battery_specs (battery_id, capacity, type, voltage, weight, \`range\`, \`warranty\`)
//          VALUES (:batteryId, :capacity, :type, :voltage, :weight, :range, :warranty)`,
//         {
//           replacements: {
//             batteryId,
//             capacity: finalSpecs.capacity,
//             type: finalSpecs.type,
//             voltage: finalSpecs.voltage,
//             weight: finalSpecs.weight,
//             range: finalSpecs.range,
//             warranty: finalSpecs.warranty,
//           },
//           type: QueryTypes.INSERT,
//           transaction: t,
//         }
//       );
//     });

//     const [battery] = await sequelize.query(
//       `SELECT b.battery_id, b.user_id, b.image_url AS imageUrl, 
//               b.purchase_date AS purchaseDate, b.order_id AS orderId, 
//               b.price, b.warranty_end AS warrantyEnd,
//               s.capacity, s.type, s.voltage, s.weight, s.\`range\`, s.\`warranty\`
//        FROM batteries b
//        JOIN battery_specs s ON b.battery_id = s.battery_id
//        WHERE b.battery_id = :batteryId`,
//       { replacements: { batteryId }, type: QueryTypes.SELECT }
//     );

//     if (!battery) {
//       throw new Error('Failed to retrieve inserted battery data');
//     }

//     const response = {
//       battery: {
//         batteryId: battery.battery_id,
//         userId: battery.user_id,
//         imageUrl: battery.imageUrl,
//         specs: {
//           capacity: battery.capacity,
//           type: battery.type,
//           voltage: battery.voltage,
//           weight: battery.weight,
//           range: battery.range,
//           warranty: battery.warranty,
//         },
//         purchaseDetails: {
//           purchaseDate: battery.purchaseDate,
//           orderId: battery.orderId,
//           price: battery.price,
//           warrantyEnd: battery.warrantyEnd,
//         },
//       },
//     };

//     console.log('Battery added:', response);
//     res.status(201).json(response);
//   } catch (err) {
//     console.error('Error adding battery:', err);
//     if (err.message.includes('Duplicate entry')) {
//       res.status(400).json({ error: `Battery ID '${batteryId}' already exists` });
//     } else {
//       res.status(500).json({ error: 'Failed to add battery: ' + err.message });
//     }
//   }
// });

// module.exports = router;