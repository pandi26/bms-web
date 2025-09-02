// const nodemailer = require('nodemailer');

// const sendEmail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // or use your SMTP provider
//     auth: {
//       user: process.env.EMAIL_USER, // your email
//       pass: process.env.EMAIL_PASS  // your email app password or real password
//     }
//   });

//   const mailOptions = {
//     from: `"Your App Name" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
