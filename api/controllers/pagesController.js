const { Pages } = require("../models");

exports.getPages = async (req, res) => {
	try {
		const pages = await Pages.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.json({ success: true, pages });
	} catch (error) {
		console.error("Error fetching pages:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};

exports.addPage = async (req, res) => {
	try {
		const { name, url, category } = req.body;

		const newPage = await Pages.create({ name, url, category });

		res.json({ success: true, page: newPage });
	} catch (error) {
		console.error("Error adding new page:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};

exports.updatePage = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, url, category } = req.body;

		const [updated] = await Pages.update(
			{ name, url, category },
			{ where: { id } },
		);

		if (!updated) {
			return res
				.status(404)
				.json({ success: false, message: "Page not found" });
		}

		const updatedPage = await Pages.findOne({ where: { id } });
		res.json({ success: true, page: updatedPage });
	} catch (error) {
		console.error("Error updating page:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};

exports.deletePage = async (req, res) => {
	try {
		const { id } = req.params;

		const deleted = await Pages.destroy({ where: { id } });

		if (!deleted) {
			return res
				.status(404)
				.json({ success: false, message: "Page not found" });
		}

		res.json({ success: true, message: "Page deleted" });
	} catch (error) {
		console.error("Error deleting page:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};
