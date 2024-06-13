const { PanelSettings } = require("../models");

exports.getSettings = async (req, res) => {
	try {
		const settings = await PanelSettings.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.json({ success: true, settings });
	} catch (error) {
		console.error("Error fetching settings:", error);
		res.status(500).send.json({ success: false });
	}
};

exports.setSetting = async (req, res) => {
	try {
		const id = req.params.id;
		const { status } = req.body;

		const [updated] = await PanelSettings.update({ status }, { where: { id } });

		if (!updated) {
			return res
				.status(404)
				.json({ success: false, message: "Setting not found" });
		}

		res.json({ success: true });
	} catch (error) {
		console.error("Error setting settings:", error);
		res.status(500).json({ success: false });
	}
};
