const { Permissions, Pages, Users } = require("../models");

exports.getPermissions = async (req, res) => {
	try {
		const permissions = await Permissions.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [
				{
					model: Users,
					attributes: ["id", "username"],
				},
				{
					model: Pages,
					attributes: ["id", "name", "url", "category"],
				},
			],
		});
		res.json({ Success: true, permissions });
	} catch (error) {
		console.error("Error fetching permissions:", error);
		res.status(500).json({ Success: false });
	}
};

exports.getUserPermissions = async (req, res) => {
	try {
		const { userId } = req.params;
		const permissions = await Permissions.findAll({
			where: { user_id: userId },
			include: [
				{
					model: Pages,
					attributes: ["id", "name", "url", "category"],
				},
			],
		});
		res.json({ Success: true, permissions });
	} catch (error) {
		console.error("Error fetching user permissions:", error);
		res.status(500).json({ Success: false });
	}
};

exports.setPermission = async (req, res) => {
	try {
		const { userId, pageId } = req.params;
		const { canAccess } = req.body;

		const [permission, created] = await Permissions.findOrCreate({
			where: { user_id: userId, page_id: pageId },
			defaults: { can_access: canAccess },
		});

		if (!created) {
			// Permission existed, so we need to update it
			permission.can_access = canAccess;
			await permission.save();
		}

		res.json({ Success: true });
	} catch (error) {
		console.error("Error setting permission:", error);
		res.status(500).json({ Success: false });
	}
};

exports.checkPermission = async (req, res) => {
	try {
		const { userId, pageUrl } = req.body;

		const page = await Pages.findOne({ where: { url: pageUrl } });
		if (!page) {
			return res
				.status(404)
				.json({ Success: false, message: "Page not found" });
		}

		const permission = await Permissions.findOne({
			where: { user_id: userId, page_id: page.id },
		});

		if (permission?.can_access) {
			res.json({ Success: true });
		} else {
			res.status(403).json({ Success: false, message: "Access denied" });
		}
	} catch (error) {
		console.error("Error checking permission:", error);
		res.status(500).json({ Success: false });
	}
};
