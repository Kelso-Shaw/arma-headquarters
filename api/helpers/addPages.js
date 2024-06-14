const { sequelize, Pages } = require("../models");

const existingPages = [
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
		name: "Page Manager",
		url: "/dashboard/page-manager",
		category: "Admin",
	},
	// Platoon Settings
	{
		name: "Player Manager",
		url: "/dashboard/player-manager",
		category: "Platoon Settings",
	},
	{
		name: "Rank Manager",
		url: "/dashboard/rank-manager",
		category: "Platoon Settings",
	},
	{
		name: "Player Attributes",
		url: "/dashboard/player-attributes",
		category: "Platoon Settings",
	},
	{
		name: "Squad Builder",
		url: "/dashboard/squad-builder",
		category: "Platoon Settings",
	},
	{
		name: "ORBAT Builder",
		url: "/dashboard/orbat-builder",
		category: "Platoon Settings",
	},
	// Mission Editor Settings
	// TO DO
	{
		name: "Mission Creator",
		url: "/dashboard/squad-builder",
		category: "Mission Editor",
	},
];

const addPages = async () => {
	try {
		await sequelize.sync();

		for (const page of existingPages) {
			const existingPage = await Pages.findOne({ where: { url: page.url } });

			if (existingPage) {
				await existingPage.destroy();
				console.log(`Page deleted: ${existingPage.name}`);
			}

			const newPage = await Pages.create(page);
			console.log(`Page added: ${newPage.name}`);
		}

		console.log("All pages have been processed.");
	} catch (error) {
		console.error("Error adding pages:", error);
	} finally {
		await sequelize.close();
	}
};

addPages();
