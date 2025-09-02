// import React, { useState } from "react";
// import axios from "axios";

// const Warranty = () => {
//   const [formData, setFormData] = useState({
//     userName: "",
//     userEmail: "",
//     phone: "",
//     address: "",
//     batterySerialNumber: "",
//     issueDescription: "",
//     purchaseDate: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       alert("User not logged in.");
//       return;
//     }

//     const formDataWithUser = {
//       ...formData,
//       user_id: userId,
//     };

//     try {
//       await axios.post("http://localhost:5000/api/warranty/submit", formDataWithUser);
//       alert("✅ Warranty claim submitted successfully!");
//       setFormData({
//         userName: "",
//         userEmail: "",
//         phone: "",
//         address: "",
//         batterySerialNumber: "",
//         issueDescription: "",
//         purchaseDate: "",
//       });
//     } catch (error) {
//       console.error("Error submitting warranty claim:", error);
//       alert("❌ Failed to submit warranty claim. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={styles.page}>
//         <div style={styles.card}>
//           <h1 style={styles.title}>Warranty Claim Request</h1>
//           <form onSubmit={handleSubmit} style={styles.form}>

//             <FormGroup label="Full Name">
//               <input
//                 style={styles.input}
//                 type="text"
//                 name="userName"
//                 placeholder="Enter your full name"
//                 value={formData.userName}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Email Address">
//               <input
//                 style={styles.input}
//                 type="email"
//                 name="userEmail"
//                 placeholder="Enter your email"
//                 value={formData.userEmail}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Phone Number">
//               <input
//                 style={styles.input}
//                 type="text"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Address">
//               <textarea
//                 style={{ ...styles.input, height: "80px", resize: "vertical" }}
//                 name="address"
//                 placeholder="Enter your full address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Battery Serial Number">
//               <input
//                 style={styles.input}
//                 type="text"
//                 name="batterySerialNumber"
//                 placeholder="Enter battery serial number"
//                 value={formData.batterySerialNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Issue Description">
//               <textarea
//                 style={{ ...styles.input, height: "100px", resize: "vertical" }}
//                 name="issueDescription"
//                 placeholder="Describe the issue in detail"
//                 value={formData.issueDescription}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <FormGroup label="Purchase Date">
//               <input
//                 style={styles.input}
//                 type="date"
//                 name="purchaseDate"
//                 value={formData.purchaseDate}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>

//             <button type="submit" style={styles.button}>
//               📩 Submit Warranty Request
//             </button>

//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// // Navbar Component
// const Navbar = () => (
//   <nav style={styles.navbar}>
//     <div style={styles.navContainer}>
//       <span style={styles.logo}>🔋 BMS Warranty</span>
//       <div style={styles.navLinks}>
//         <a href="/dashboard" style={styles.navLink}>Dashboard</a>
//         <a href="/support" style={styles.navLink}>Support</a>
//         <a href="/contact" style={styles.navLink}>Contact</a>
//       </div>
//     </div>
//   </nav>
// );

// // FormGroup Component
// const FormGroup = ({ label, children }) => (
//   <div style={styles.formGroup}>
//     <label style={styles.label}>{label}</label>
//     {children}
//   </div>
// );

// // Styles
// const styles = {
//   navbar: {
//     backgroundColor: "#333",
//     padding: "15px 30px",
//     color: "#ffffff",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   navContainer: {
//     width: "100%",
//     maxWidth: "1200px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   logo: {
//     fontSize: "22px",
//     fontWeight: "bold",
//   },
//   navLinks: {
//     display: "flex",
//     gap: "20px",
//   },
//   navLink: {
//     color: "#ffffff",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "500",
//   },
//   page: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "90vh",
//     background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
//     padding: "20px",
//   },
//   card: {
//     background: "#ffffff",
//     padding: "40px",
//     borderRadius: "12px",
//     width: "100%",
//     maxWidth: "550px",
//     boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "30px",
//     fontSize: "32px",
//     fontWeight: "700",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   formGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     marginBottom: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#555",
//   },
//   input: {
//     padding: "12px",
//     fontSize: "16px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     outline: "none",
//     transition: "border-color 0.3s",
//   },
//   button: {
//     marginTop: "10px",
//     padding: "14px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "18px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "background 0.3s ease",
//   },
// };

// export default Warranty;
import React, { useState } from "react";
import axios from "axios";

const Warranty = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    address: "",
    batterySerialNumber: "",
    issueDescription: "",
    purchaseDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'userName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
        return '';

      case 'userEmail':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        return '';

      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Please provide a complete address (minimum 10 characters)';
        return '';

      case 'batterySerialNumber':
        if (!value.trim()) return 'Battery serial number is required';
        if (value.trim().length < 5) return 'Serial number must be at least 5 characters';
        if (!/^[A-Za-z0-9\-]+$/.test(value)) return 'Serial number can only contain letters, numbers, and hyphens';
        return '';

      case 'issueDescription':
        if (!value.trim()) return 'Issue description is required';
        if (value.trim().length < 20) return 'Please provide a detailed description (minimum 20 characters)';
        if (value.trim().length > 1000) return 'Description must be less than 1000 characters';
        return '';

      case 'purchaseDate':
        if (!value) return 'Purchase date is required';
        const today = new Date();
        const purchaseDate = new Date(value);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 10); // 10 years ago
        
        if (purchaseDate > today) return 'Purchase date cannot be in the future';
        if (purchaseDate < maxDate) return 'Purchase date seems too old (more than 10 years)';
        return '';

      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if there are any errors
    if (Object.keys(formErrors).some(key => formErrors[key])) {
      alert("⚠️ Please fix the errors in the form before submitting.");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("❌ User not logged in. Please login first.");
      return;
    }

    setIsSubmitting(true);

    const formDataWithUser = {
      ...formData,
      user_id: userId,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/warranty/submit", formDataWithUser);
      
      if (response.status === 200 || response.status === 201) {
        alert("✅ Warranty claim submitted successfully!");
        
        // Reset form
        setFormData({
          userName: "",
          userEmail: "",
          phone: "",
          address: "",
          batterySerialNumber: "",
          issueDescription: "",
          purchaseDate: "",
        });
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      console.error("Error submitting warranty claim:", error);
      
      if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || "Server error occurred";
        alert(`❌ ${message}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("❌ Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        alert("❌ Failed to submit warranty claim. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(validateForm()).length === 0 && 
                     Object.keys(formData).every(key => formData[key].trim());

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Warranty Claim Request</h1>
          <form onSubmit={handleSubmit} style={styles.form} noValidate>

            <FormGroup label="Full Name" error={errors.userName}>
              <input
                style={{
                  ...styles.input,
                  ...(errors.userName ? styles.inputError : {}),
                  ...(touched.userName && !errors.userName ? styles.inputSuccess : {})
                }}
                type="text"
                name="userName"
                placeholder="Enter your full name"
                value={formData.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>

            <FormGroup label="Email Address" error={errors.userEmail}>
              <input
                style={{
                  ...styles.input,
                  ...(errors.userEmail ? styles.inputError : {}),
                  ...(touched.userEmail && !errors.userEmail ? styles.inputSuccess : {})
                }}
                type="email"
                name="userEmail"
                placeholder="Enter your email address"
                value={formData.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>

            <FormGroup label="Phone Number" error={errors.phone}>
              <input
                style={{
                  ...styles.input,
                  ...(errors.phone ? styles.inputError : {}),
                  ...(touched.phone && !errors.phone ? styles.inputSuccess : {})
                }}
                type="tel"
                name="phone"
                placeholder="Enter your phone number (e.g., +1234567890)"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>

            <FormGroup label="Address" error={errors.address}>
              <textarea
                style={{
                  ...styles.input,
                  height: "80px",
                  resize: "vertical",
                  ...(errors.address ? styles.inputError : {}),
                  ...(touched.address && !errors.address ? styles.inputSuccess : {})
                }}
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>

            <FormGroup label="Battery Serial Number" error={errors.batterySerialNumber}>
              <input
                style={{
                  ...styles.input,
                  ...(errors.batterySerialNumber ? styles.inputError : {}),
                  ...(touched.batterySerialNumber && !errors.batterySerialNumber ? styles.inputSuccess : {})
                }}
                type="text"
                name="batterySerialNumber"
                placeholder="Enter battery serial number (e.g., BAT-12345)"
                value={formData.batterySerialNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>

            <FormGroup label="Issue Description" error={errors.issueDescription}>
              <textarea
                style={{
                  ...styles.input,
                  height: "100px",
                  resize: "vertical",
                  ...(errors.issueDescription ? styles.inputError : {}),
                  ...(touched.issueDescription && !errors.issueDescription ? styles.inputSuccess : {})
                }}
                name="issueDescription"
                placeholder="Describe the issue in detail (minimum 20 characters)"
                value={formData.issueDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <div style={styles.charCount}>
                {formData.issueDescription.length}/1000 characters
              </div>
            </FormGroup>

            <FormGroup label="Purchase Date" error={errors.purchaseDate}>
              <input
                style={{
                  ...styles.input,
                  ...(errors.purchaseDate ? styles.inputError : {}),
                  ...(touched.purchaseDate && !errors.purchaseDate ? styles.inputSuccess : {})
                }}
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </FormGroup>

            <button 
              type="submit" 
              style={{
                ...styles.button,
                ...(isSubmitting ? styles.buttonDisabled : {}),
                ...(isFormValid ? styles.buttonValid : {})
              }}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "⏳ Submitting..." : "📩 Submit Warranty Request"}
            </button>

            {!isFormValid && (
              <div style={styles.formHint}>
                Please fill in all required fields correctly to enable submission.
              </div>
            )}

          </form>
        </div>
      </div>
    </>
  );
};

// Navbar Component
const Navbar = () => (
  <nav style={styles.navbar}>
    <div style={styles.navContainer}>
      <span style={styles.logo}>🔋 BMS Warranty</span>
      <div style={styles.navLinks}>
        <a href="/dashboard" style={styles.navLink}>Dashboard</a>
        <a href="/support" style={styles.navLink}>Support</a>
        <a href="/contact" style={styles.navLink}>Contact</a>
      </div>
    </div>
  </nav>
);

// FormGroup Component
const FormGroup = ({ label, children, error }) => (
  <div style={styles.formGroup}>
    <label style={styles.label}>{label}</label>
    {children}
    {error && <div style={styles.errorMessage}>{error}</div>}
  </div>
);

// Enhanced Styles
const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "15px 30px",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navContainer: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "550px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  inputError: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
  },
  inputSuccess: {
    borderColor: "#28a745",
    backgroundColor: "#f8fff8",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "not-allowed",
    transition: "all 0.3s ease",
    opacity: 0.6,
  },
  buttonValid: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    opacity: 1,
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
    opacity: 0.5,
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: "14px",
    marginTop: "5px",
    fontWeight: "500",
  },
  charCount: {
    fontSize: "12px",
    color: "#666",
    marginTop: "5px",
    textAlign: "right",
  },
  formHint: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
    border: "1px solid #ffeaa7",
  },
};

export default Warranty;