const bcrypt = require("bcrypt");
const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash("password123", 10);
		return queryInterface.bulkInsert("Users", [
			{
				username: "Administrator",
				email: `admin@${process.env.EMAIL_HOST}`,
				password: hashedPassword,
				name: "Administrator",
				role: "3",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
