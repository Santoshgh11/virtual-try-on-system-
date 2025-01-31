const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL Connected'))
  .catch(err => console.error('❌ PostgreSQL Connection Error:', err));

module.exports = sequelize;
