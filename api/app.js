const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
const Users = require('./models/users')(sequelize, DataTypes);

// Synchronize the database
// sequelize.sync({ force: false }).then(() => {
//   console.log("Database synchronized");
// }).catch(err => {
//   console.error("Error synchronizing database:", err);
// });

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, email, password: hashedPassword, name, role });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send(error.message);
  }
});

// Login a user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
    if (user == null) {
      return res.status(400).send('Cannot find user');
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken });
    } else {
      res.status(403).send('Not Allowed');
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send(error.message);
  }
});

// Get all users (protected route)
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send(error.message);
  }
});

// Add a new user (protected route)
app.post("/users", authenticateToken, async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
