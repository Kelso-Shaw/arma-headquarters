const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

exports.register = async (req, res) => {
	try {
		const { username, password, name, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await Users.create({
			username,
			password: hashedPassword,
			name,
			role,
		});
		res.status(201).json({ Success: true, user });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).send({ Success: false });
	}
};

exports.login = async (req, res) => {
	try {
		const { name, password } = req.body;
		const user = await Users.findOne({ where: { name } });
		if (user == null) {
			return res
				.status(400)
				.json({ Success: false, Message: "Username or Password is incorrect" });
		}

		if (await bcrypt.compare(password, user.password)) {
			const accessToken = jwt.sign(
				{ name: user.name, role: user.role },
				process.env.ACCESS_TOKEN_SECRET,
			);
			res.json({ Success: true, accessToken, role: user.role });
		} else {
			res.status(403).send.json({
				Success: false,
				Message: "Username or Password is incorrect",
			});
		}
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).send({ Success: false });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await Users.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		res.json({ Success: true, users });
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).send.json({ Success: false });
	}
};

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await Users.findOne({
			where: { id },
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		res.json({ Success: true, user });
	} catch (error) {
		console.error("Error getting user:", error);
		res.status(500).json({ Success: false });
	}
};

exports.addUser = async (req, res) => {
	try {
		const { password, ...otherDetails } = req.body;

		const plainPassword = password || "password123";

		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		const user = await Users.create({
			...otherDetails,
			password: hashedPassword,
		});
		res.status(201).json({ Success: true, user });
	} catch (error) {
		console.error("Error adding user:", error);
		res.status(500).json({ Success: false, Message: error.errors[0].message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const deletedUser = await Users.destroy({
			where: { id: userId },
		});

		if (deletedUser) {
			res
				.status(200)
				.json({ Success: true, message: "User deleted successfully" });
		} else {
			res.status(404).json({ Success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ Success: false, message: "Internal server error" });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const { name, password, role } = req.body;
		const body = {
			name: name,
			role: role,
		};

		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			body.password = hashedPassword;
		}

		const [updated] = await Users.update(body, {
			where: { id: userId },
		});

		if (!updated) {
			res.status(404).json({ Success: false, message: "User not found" });
		}
		const updatedUser = await Users.findOne({ where: { id: userId } });
		res.status(200).json({
			Success: true,
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ Success: false, message: "Internal server error" });
	}
};
