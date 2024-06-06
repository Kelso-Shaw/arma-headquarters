require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

// Database configuration from environment variables
const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

// Create a connection to the database management system (DBMS), not the specific database
const sequelize = new Sequelize(`mysql://${username}:${password}@${host}/`, {
  logging: false, // Turn off logging
});

async function initializeDatabase() {
  try {
    // Check if the database exists by trying to connect to it
    const tempSequelize = new Sequelize(databaseName, username, password, {
      dialect: "mysql",
      host,
    });
    await tempSequelize.authenticate();
    console.log(`Database '${databaseName}' already exists.`);
  } catch (error) {
    // If connection fails, assume the database does not exist and create it
    console.log(`Database '${databaseName}' does not exist. Creating now...`);
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
    console.log(`Database '${databaseName}' created successfully.`);
  } finally {
    // Close all connections
    await sequelize.close();
  }
}

initializeDatabase();
