const { PlayerUserAttributes } = require("../models");

exports.getAllAssociations = async (req, res) => {
	try {
		const associations = await PlayerUserAttributes.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.status(200).json({ Success: true, associations });
	} catch (error) {
		console.error("Error retrieving associations:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to retrieve associations" });
	}
};

exports.addAssociation = async (req, res) => {
	const { PlayerUserId, PlayerAttributeId } = req.body;

	try {
		const newAssociation = await PlayerUserAttributes.create({
			PlayerUserId,
			PlayerAttributeId,
		});
		res.status(201).json({ Success: true, newAssociation });
	} catch (error) {
		console.error("Error adding association:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to add association" });
	}
};

exports.deleteAssociation = async (req, res) => {
	const { id } = req.params;

	try {
		const association = await PlayerUserAttributes.findByPk(id);
		if (!association) {
			return res
				.status(404)
				.json({ Success: false, Message: "Association not found" });
		}

		await association.destroy();
		res
			.status(200)
			.json({ Success: true, Message: "Association deleted successfully" });
	} catch (error) {
		console.error("Error deleting association:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to delete association" });
	}
};

exports.updateAssociation = async (req, res) => {
	const { id } = req.params;
	const { PlayerUserId, PlayerAttributeId } = req.body;

	try {
		const existingAssociation = await PlayerUserAttributes.findByPk(id);
		if (!existingAssociation) {
			return res
				.status(404)
				.json({ Success: false, Message: "Association not found" });
		}

		existingAssociation.PlayerUserId = PlayerUserId;
		existingAssociation.PlayerAttributeId = PlayerAttributeId;
		await existingAssociation.save();
		res
			.status(200)
			.json({ Success: true, updatedAssociation: existingAssociation });
	} catch (error) {
		console.error("Error updating association:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to update association" });
	}
};
