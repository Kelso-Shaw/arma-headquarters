const { sequelize, Pages } = require("../models");
const fs = require("node:fs");
const path = require("node:path");

const exportPages = async () => {
	const filePath = path.resolve(__dirname, "pages.json");

	let pagesjson;
	try {
		pagesjson = fs.readFileSync(filePath, "utf-8");
	} catch (error) {
		if (error.code === "ENOENT") {
			console.warn("pages.json file not found, a new one will be created.");
			pagesjson = "[]";
		} else {
			console.error("Error reading pages.json file:", error);
			process.exit(1);
		}
	}

	let pages;
	try {
		pages = JSON.parse(pagesjson);
	} catch (error) {
		console.error("Error parsing pages.json:", error);
		process.exit(1);
	}

	try {
		await sequelize.sync();
		const dbPages = await Pages.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		const updatedPages = [...dbPages.map((page) => page.toJSON())];
		pagesjson = JSON.stringify(updatedPages, null, 2);
		fs.writeFileSync(filePath, pagesjson, "utf-8");
		console.log("Pages exported successfully.");
	} catch (error) {
		console.error("Error exporting pages:", error);
	}
};

module.exports = exportPages;
