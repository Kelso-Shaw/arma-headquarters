const { sequelize, Pages } = require("../models");

const existingPages = [
	// Home Pages
	{
		name: "Home",
		url: "/",
		category: "Home",
	},
	{
		name: "Dashboard",
		url: "/dashboard",
		category: "Home",
	},
	// Admin Settings
	{
		name: "User Manager",
		url: "/dashboard/user-manager",
		category: "Admin",
	},
	{
		name: "Panel Settings",
		url: "/dashboard/panel-settings",
		category: "Admin",
	},
	{
		name: "Player Manager",
		url: "/dashboard/player-manager",
		category: "Admin",
	},
	{
		name: "Rank Manager",
		url: "/dashboard/rank-manager",
		category: "Admin",
	},
	{
		name: "Player Attributes",
		url: "/dashboard/player-attributes",
		category: "Admin",
	},
	// Mission Editor Settings
	// TO DO
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
