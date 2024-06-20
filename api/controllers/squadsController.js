const { Squads } = require("../models");

exports.getSquads = async (req, res) => {
	try {
		const squads = await Squads.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			order: [["order", "ASC"]],
		});

		const groupedSquads = squads.reduce((result, squad) => {
			const { name, role, assigned, order, id } = squad;
			if (!result[name]) {
				result[name] = {
					name,
					roles: [],
				};
			}
			result[name].roles.push({ id, role, assigned, order });
			return result;
		}, {});

		const response = Object.values(groupedSquads);

		res.status(200).json({ success: true, squads: response });
	} catch (error) {
		console.error("Error retrieving squads:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to retrieve squads" });
	}
};

exports.addSquad = async (req, res) => {
	const { name, roles } = req.body;

	try {
		const newSquads = await Promise.all(
			roles.map((role) => {
				return Squads.create({
					name,
					role: role.role,
					assigned: role.assigned,
					order: role.order,
				});
			}),
		);

		res.status(201).json({ success: true, squads: newSquads });
	} catch (error) {
		console.error("Error creating squad:", error);
		res.status(500).json({ success: false, message: "Failed to create squad" });
	}
};

exports.deleteSquad = async (req, res) => {
	const { name } = req.body;

	try {
		const deleteSquad = await Squads.destroy({
			where: { name },
		});
		if (!deleteSquad) {
			return res
				.status(404)
				.json({ success: false, message: "Squad not found" });
		}
		res.status(200).json({ success: true, message: "Squad Deleted" });
	} catch (error) {
		console.error("Error deleting squad:", error);
		res.status(500).json({ success: false, message: "Failed to delete squad" });
	}
};

exports.updateSquad = async (req, res) => {
	const { oldName, name, roles } = req.body;

	try {
		const existingSquads = await Squads.findAll({
			where: { name: oldName },
		});

		if (existingSquads.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Squad not found" });
		}

		const existingRolesMap = existingSquads.reduce((map, squad) => {
			map[squad.role] = squad;
			return map;
		}, {});

		await Promise.all(
			roles.map(async (role) => {
				if (existingRolesMap[role.role]) {
					await existingRolesMap[role.role].update({
						name,
						assigned: role.assigned,
						order: role.order,
					});
					delete existingRolesMap[role.role];
				} else {
					await Squads.create({
						name,
						role: role.role,
						assigned: role.assigned,
						order: role.order,
					});
				}
			}),
		);

		await Promise.all(
			Object.values(existingRolesMap).map(async (squad) => {
				await squad.destroy();
			}),
		);

		res
			.status(200)
			.json({ success: true, message: "Squad updated successfully" });
	} catch (error) {
		console.error("Error updating squad:", error);
		res.status(500).json({ success: false, message: "Failed to update squad" });
	}
};
