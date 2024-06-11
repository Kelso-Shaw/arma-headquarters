const { sequelize, Pages } = require("./models");

const existingPages = [
	{ name: "Home", url: "/" },
	{ name: "User-Manager", url: "/dashboard/user-manager" },
	{ name: "PanelSettings", url: "/dashboard/panel-settings" },
	{ name: "Player-Manager", url: "/dashboard/player-manager" },
	{ name: "Rank-Manager", url: "/dashboard/rank-manager" },
	{ name: "Player-Attributes", url: "/dashboard/player-attributes" },
	{ name: "Dashboard", url: "/dashboard" },
];

const addPages = async () => {
	try {
		await sequelize.sync();

		for (const page of existingPages) {
			const [newPage, created] = await Pages.findOrCreate({
				where: { url: page.url },
				defaults: page,
			});

			if (created) {
				console.log(`Page added: ${newPage.name}`);
			} else {
				console.log(`Page already exists: ${newPage.name}`);
			}
		}

		console.log("All pages have been processed.");
	} catch (error) {
		console.error("Error adding pages:", error);
	} finally {
		sequelize.close();
	}
};

addPages();
