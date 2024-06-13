const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PlayerUser } = require("../models");

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const player = await PlayerUser.findOne({ where: { username } });
		if (player == null) {
			return res
				.status(400)
				.json({ Success: false, Message: "Username or Password is incorrect" });
		}

		if (await bcrypt.compare(password, player.password)) {
			const accessToken = jwt.sign(
				{ username: player.username, role: player.role },
				process.env.ACCESS_TOKEN_SECRET,
			);
			res.json({ Success: true, accessToken, role: player.role });
		} else {
			res.status(403).send.json({
				Success: false,
				Message: "Username or Password is incorrect",
			});
		}
	} catch (error) {
		console.error("Error logging in player:", error);
		res.status(500).send({ Success: false });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const players = await PlayerUser.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		res.json({ Success: true, players });
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).send.json({ Success: false });
	}
};

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const player = await PlayerUser.findOne({
			where: { id },
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		res.json({ Success: true, player });
	} catch (error) {
		console.error("Error getting player:", error);
		res.status(500).json({ Success: false });
	}
};

exports.addUser = async (req, res) => {
	try {
		const { password, ...otherDetails } = req.body;

		const plainPassword = password || "password123";

		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		const player = await PlayerUser.create({
			...otherDetails,
			password: hashedPassword,
		});
		res.status(201).json({ Success: true, player });
	} catch (error) {
		console.error("Error adding player:", error);
		res.status(500).json({ Success: false });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const deletedPlayer = await PlayerUser.destroy({
			where: { id: userId },
		});

		if (deletedPlayer) {
			res
				.status(200)
				.json({ Success: true, message: "User deleted successfully" });
		} else {
			res.status(404).json({ Success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Error deleting player:", error);
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
		const updatedPlayer = await PlayerUser.findOne({ where: { id: userId } });
		res.status(200).json({
			Success: true,
			message: "User updated successfully",
			player: updatedPlayer,
		});
	} catch (error) {
		console.error("Error updating player:", error);
		res.status(500).json({ Success: false, message: "Internal server error" });
	}
};
