const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	PlayerUser,
	PlayerAttributes,
	PlayerUserAttributes,
	Squads,
} = require("../models");

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const player = await PlayerUser.findOne({ where: { username } });
		if (player == null) {
			return res
				.status(400)
				.json({ success: false, Message: "Username or Password is incorrect" });
		}

		if (await bcrypt.compare(password, player.password)) {
			const accessToken = jwt.sign(
				{ username: player.username, rank: player.rank },
				process.env.ACCESS_TOKEN_SECRET,
			);
			res.json({
				success: true,
				accessToken,
				rank: player.rank,
				id: player.id,
			});
		} else {
			res.status(403).send.json({
				success: false,
				Message: "Username or Password is incorrect",
			});
		}
	} catch (error) {
		console.error("Error logging in player:", error);
		res.status(500).send({ success: false });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const players = await PlayerUser.findAll({
			include: [
				{
					model: PlayerAttributes,
					as: "attributes",
					through: {
						attributes: [],
					},
					attributes: { exclude: ["createdAt", "updatedAt", "id"] },
				},
				{
					model: Squads,
					as: "squads",
					attributes: ["name", "role"],
				},
			],
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		res.status(200).json({ success: true, players });
	} catch (error) {
		console.error("Error retrieving players:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to retrieve players" });
	}
};

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const player = await PlayerUser.findOne({
			where: { id },
			include: [
				{
					model: PlayerAttributes,
					as: "attributes",
					through: {
						attributes: [],
					},
					attributes: { exclude: ["createdAt", "updatedAt"] },
				},
				{
					model: Squads,
					as: "squads",
					attributes: ["name"],
				},
			],
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		if (!player) {
			return res
				.status(404)
				.json({ success: false, message: "Player not found" });
		}

		res.json({ success: true, player });
	} catch (error) {
		console.error("Error getting user:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to retrieve user" });
	}
};

exports.addUser = async (req, res) => {
	try {
		const { password, attributes, ...otherDetails } = req.body;

		const plainPassword = password || "password123";
		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		const player = await PlayerUser.create({
			...otherDetails,
			password: hashedPassword,
		});

		if (attributes?.length) {
			const newAttributes = attributes.map((attr) => ({
				PlayerUserId: player.id,
				PlayerAttributeId: attr,
			}));
			await PlayerUserAttributes.bulkCreate(newAttributes);
		}

		const newPlayer = await PlayerUser.findByPk(player.id, {
			include: [
				{
					model: PlayerAttributes,
					as: "attributes",
					through: {
						attributes: [],
					},
				},
			],
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		res.status(201).json({ success: true, player: newPlayer });
	} catch (error) {
		console.error("Error adding user:", error);
		res.status(500).json({ success: false, Message: "Failed to add user" });
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
				.json({ success: true, message: "User deleted successfully" });
		} else {
			res.status(404).json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

exports.updateUser = async (req, res) => {
	const { id, username, rank, password, attributes } = req.body;

	try {
		let player;
		if (id) {
			player = await PlayerUser.findByPk(id);
			if (!player) {
				return res
					.status(404)
					.json({ success: false, Message: "Player not found" });
			}
			player.username = username;
			player.rank = rank;
			if (password) player.password = await bcrypt.hash(password, 10);
			await player.save();
		} else {
			const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
			player = await PlayerUser.create({
				username,
				rank,
				password: hashedPassword,
			});
		}

		if (attributes?.length) {
			// Clear existing attributes
			await PlayerUserAttributes.destroy({
				where: { PlayerUserId: player.id },
			});

			// Create new attributes
			const newAttributes = attributes.map((attr) => ({
				PlayerUserId: player.id,
				PlayerAttributeId: attr,
			}));
			await PlayerUserAttributes.bulkCreate(newAttributes);
		} else {
			// If no attributes provided, ensure to clear any existing ones
			await PlayerUserAttributes.destroy({
				where: { PlayerUserId: player.id },
			});
		}

		const updatedPlayer = await PlayerUser.findByPk(player.id, {
			include: [
				{
					model: PlayerAttributes,
					as: "attributes",
					through: {
						attributes: [],
					},
				},
			],
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		res.status(200).json({ success: true, player: updatedPlayer });
	} catch (error) {
		console.error("Error saving player:", error);
		res.status(500).json({ success: false, Message: "Failed to save player" });
	}
};
