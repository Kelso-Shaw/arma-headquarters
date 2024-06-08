const { PlayerRanks } = require("../models");

exports.getRanks = async (req, res) => {
	try {
		const ranks = await PlayerRanks.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		res.status(200).json({ Success: true, ranks });
	} catch (error) {
		console.error("Error retrieving ranks:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to retrieve ranks" });
	}
};

exports.addRank = async (req, res) => {
	const { rank, order } = req.body;

	try {
		const newRank = await PlayerRanks.create({ rank, order });
		res.status(201).json({ Success: true, newRank });
	} catch (error) {
		console.error("Error adding rank:", error);
		res.status(500).json({ Success: false, Message: "Failed to add rank" });
	}
};

exports.deleteRank = async (req, res) => {
	const { id } = req.params;

	try {
		const rank = await PlayerRanks.findByPk(id);
		if (!rank) {
			return res
				.status(404)
				.json({ Success: false, Message: "Rank not found" });
		}

		await rank.destroy();
		res
			.status(200)
			.json({ Success: true, Message: "Rank deleted successfully" });
	} catch (error) {
		console.error("Error deleting rank:", error);
		res.status(500).json({ Success: false, Message: "Failed to delete rank" });
	}
};

exports.updateRank = async (req, res) => {
	const { id } = req.params;
	const { rank, order } = req.body;

	try {
		const existingRank = await PlayerRanks.findByPk(id);
		if (!existingRank) {
			return res
				.status(404)
				.json({ Success: false, Message: "Rank not found" });
		}

		existingRank.rank = rank;
		existingRank.order = order;
		await existingRank.save();
		res.status(200).json({ Success: true, updatedRank: existingRank });
	} catch (error) {
		console.error("Error updating rank:", error);
		res.status(500).json({ Success: false, Message: "Failed to update rank" });
	}
};
