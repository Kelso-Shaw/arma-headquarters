const { sequelize, Pages } = require("../models");
const fs = require("node:fs");
const path = require("node:path");

const addPages = async () => {
	const filePath = path.resolve(__dirname, "pages.json");

	let existingPages;
	try {
		const pagesjson = fs.readFileSync(filePath, "utf-8");
		existingPages = JSON.parse(pagesjson);
	} catch (error) {
		console.error("Error reading or parsing pages.json file:", error);
		process.exit(1);
	}

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
