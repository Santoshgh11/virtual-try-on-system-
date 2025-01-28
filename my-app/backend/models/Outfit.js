// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres://username:password@localhost:5432/mydb');

// const Outfit = sequelize.define('Outfit', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   size: DataTypes.STRING,
//   style: DataTypes.STRING,
//   availableStock: DataTypes.INTEGER
// });

// module.exports = Outfit;


// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();

// // ✅ Using environment variables for PostgreSQL connection
// const sequelize = new Sequelize(
//   process.env.POSTGRES_DB, 
//   process.env.POSTGRES_USER, 
//   process.env.POSTGRES_PASSWORD, 
//   {
//     host: process.env.POSTGRES_HOST,
//     dialect: 'postgres'
//   }
// );

// // ✅ Define Outfit Model
// const Outfit = sequelize.define('Outfit', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   size: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   style: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   availableStock: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   }
// }, {
//   timestamps: true
// });

// // ✅ Sync Model with Database
// (async () => {
//   try {
//     await sequelize.sync();
//     console.log("✅ Outfit Table Synchronized with PostgreSQL");
//   } catch (error) {
//     console.error("❌ Error syncing Outfit table:", error);
//   }
// })();

// module.exports = Outfit;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Outfit = sequelize.define('Outfit', {
  name: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.STRING, allowNull: false },
  style: { type: DataTypes.STRING, allowNull: false },
  availableStock: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

sequelize.sync()
  .then(() => console.log('✅ Outfit Table Synced'))
  .catch(err => console.error('❌ Outfit Table Sync Error:', err));

module.exports = Outfit;
