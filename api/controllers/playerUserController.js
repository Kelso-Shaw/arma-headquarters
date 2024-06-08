const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PlayerUsers } = require("../models");

exports.register = async (req, res) => {
	try {
		const { username, email, password, name, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await PlayerUsers.create({
			username,
			email,
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
		const { email, password } = req.body;
		const user = await PlayerUsers.findOne({ where: { email } });
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
			res.json({ Success: true, accessToken });
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
		const users = await PlayerUsers.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		res.json({ Success: true, users });
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).send.json({ Success: false });
	}
};

exports.addUser = async (req, res) => {
	try {
		const { password, ...otherDetails } = req.body;

		const plainPassword = password || "password123";

		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		const user = await PlayerUsers.create({
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
		const deletedUser = await PlayerUsers.destroy({
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
		const { name, email, password, role } = req.body;

		const [updated] = await PlayerUsers.update(
			{
				name: name,
				email: email,
				password: password,
				role: role,
			},
			{
				where: { id: userId },
			},
		);

		if (!updated) {
			res.status(404).json({ Success: false, message: "User not found" });
		}
		const updatedUser = await PlayerUsers.findOne({ where: { id: userId } });
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