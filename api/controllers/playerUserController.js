const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PlayerUser } = require("../models");

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await PlayerUser.findOne({ where: { username } });
		if (user == null) {
			return res
				.status(400)
				.json({ Success: false, Message: "Username or Password is incorrect" });
		}

		if (await bcrypt.compare(password, user.password)) {
			const accessToken = jwt.sign(
				{ username: user.username, role: user.role },
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
		const users = await PlayerUser.findAll({
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
		const user = await PlayerUser.findOne({
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

		const user = await PlayerUser.create({
			...otherDetails,
			password: hashedPassword,
		});
		res.status(201).json({ Success: true, user });
	} catch (error) {
		console.error("Error adding user:", error);
		res.status(500).json({ Success: false });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const deletedUser = await PlayerUser.destroy({
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
		const { username, password, role } = req.body;
		const body = {
			username: username,
			role: role,
		};

		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			body.password = hashedPassword;
		}

		const [updated] = await PlayerUser.update(body, {
			where: { id: userId },
		});

		if (!updated) {
			res.status(404).json({ Success: false, message: "User not found" });
		}
		const updatedUser = await PlayerUser.findOne({ where: { id: userId } });
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
