const bcrypt = require("bcrypt");
const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash("password123", 10);
		return queryInterface.bulkInsert("Users", [
			{
				username: "Administrator",
				password: hashedPassword,
				name: "Administrator",
				role: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
