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
					attributes: ["id", "name", "url"],
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
					attributes: ["id", "name", "url"],
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

		const [updated] = await Permissions.update(
			{ can_access: canAccess },
			{ where: { user_id: userId, page_id: pageId } },
		);

		if (!updated) {
			return res
				.status(404)
				.json({ Success: false, message: "Permission not found" });
		}

		res.json({ Success: true });
	} catch (error) {
		console.error("Error setting permission:", error);
		res.status(500).json({ Success: false });
	}
};

exports.addPage = async (req, res) => {
	try {
		const { name, url } = req.body;

		const newPage = await Pages.create({ name, url });

		res.json({ Success: true, page: newPage });
	} catch (error) {
		console.error("Error adding new page:", error);
		res.status(500).json({ Success: false, error: error.message });
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
