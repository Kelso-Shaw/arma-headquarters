const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

exports.register = async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
      name,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user == null) {
      return res.status(400).json({ Success: false });
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ Success: true, accessToken });
    } else {
      res.status(403).send.json({ Success: false });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send.json({ Success: false });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ Success: false });
  }
};
