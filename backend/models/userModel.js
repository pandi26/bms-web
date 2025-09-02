// const { DataTypes } = require('sequelize');
// const bcrypt = require('bcryptjs');
// const sequelize = require('../config/db'); // Your Sequelize instance

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: { msg: 'Username cannot be empty' }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: { msg: 'Enter a valid email address' }
//     }
//   },
//   userId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     defaultValue: () => `UID-${Date.now()}-${Math.floor(Math.random() * 10000)}`
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [6, 100],
//         msg: 'Password should be at least 6 characters'
//       }
//     }
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     validate: {
//       min: 0
//     }
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   district: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   state: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   pincode: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     validate: {
//       is: {
//         args: /^[0-9]{4,10}$/,
//         msg: 'Invalid pincode format'
//       }
//     }
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     validate: {
//       is: {
//         args: /^[0-9+\-() ]{7,15}$/,
//         msg: 'Phone number format is invalid'
//       }
//     }
//   },
//   batteryId: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'user'
//   },
//   status: {
//     type: DataTypes.STRING,
//     defaultValue: 'requested'
//   }
// }, {
//   tableName: 'users',
//   timestamps: true,
//   hooks: {
//     beforeCreate: async (user) => {
//       if (user.password) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//       }
//     },
//     beforeUpdate: async (user) => {
//       if (user.changed('password')) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//       }
//     }
//   }
// });

// // Method to compare hashed passwords
// User.prototype.comparePassword = async function (plainPassword) {
//   return await bcrypt.compare(plainPassword, this.password);
// };

// module.exports = User;
const { DataTypes } = require('sequelize');


const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // import UUID
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }},
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
    userId: {
    type: DataTypes.STRING,
    
    allowNull: false,
  },
  password: { type: DataTypes.STRING, allowNull: false, validate: { len: [6, 100] }},
  age: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 }},
  address: { type: DataTypes.STRING, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  pincode: { type: DataTypes.STRING, allowNull: true, validate: { is: /^[0-9]{4,10}$/ }},
  phone: { type: DataTypes.STRING, allowNull: true, validate: { is: /^[0-9+\-() ]{7,15}$/ }},
  batteryId: {
  type: DataTypes.STRING,
  allowNull: true,
  
},
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
  status: { type: DataTypes.STRING, defaultValue: 'requested' }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (!user.userId) {
        user.userId = uuidv4();  // Automatically generate a unique userId here
      }
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = User;
