require("dotenv").config();
const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_password,
  {
    dialect: "mysql",
    host: "sql12.freesqldatabase.com",
    port: 3306,
    logging:false
  }
);