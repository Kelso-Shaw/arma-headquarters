const { PlayerAttributes } = require("../models");

// Get all player attributes
exports.getAttributes = async (req, res) => {
	try {
		const attributes = await PlayerAttributes.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.status(200).json({ Success: true, attributes });
	} catch (error) {
		console.error("Error retrieving attributes:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to retrieve attributes" });
	}
};

// Add a new player attribute
exports.addAttribute = async (req, res) => {
	const { attribute, description } = req.body;

	try {
		const newAttribute = await PlayerAttributes.create({
			attribute,
			description,
		});
		res.status(201).json({ Success: true, newAttribute });
	} catch (error) {
		console.error("Error adding attribute:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to add attribute" });
	}
};

// Delete a player attribute
exports.deleteAttribute = async (req, res) => {
	const { id } = req.params;

	try {
		const attribute = await PlayerAttributes.findByPk(id);
		if (!attribute) {
			return res
				.status(404)
				.json({ Success: false, Message: "Attribute not found" });
		}

		await attribute.destroy();
		res
			.status(200)
			.json({ Success: true, Message: "Attribute deleted successfully" });
	} catch (error) {
		console.error("Error deleting attribute:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to delete attribute" });
	}
};

exports.updateAttribute = async (req, res) => {
	const { id } = req.params;
	const { attribute, description } = req.body;

	try {
		const existingAttribute = await PlayerAttributes.findByPk(id);
		if (!existingAttribute) {
			return res
				.status(404)
				.json({ Success: false, Message: "Attribute not found" });
		}

		existingAttribute.attribute = attribute;
		existingAttribute.description = description;
		await existingAttribute.save();
		res
			.status(200)
			.json({ Success: true, updatedAttribute: existingAttribute });
	} catch (error) {
		console.error("Error updating attribute:", error);
		res
			.status(500)
			.json({ Success: false, Message: "Failed to update attribute" });
	}
};
