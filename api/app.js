require("module-alias/register");
require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(databaseName, username, password, {
  dialect: "mysql",
  host,
});

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Models
const Users = require("./models/users")(sequelize, DataTypes);

// Import userRoutes
const userRoutes = require("./routes/userRoutes");

// Use the user routes
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
