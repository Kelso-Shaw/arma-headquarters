module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Flows",
			[
				{
					nodes: JSON.stringify([]),
					edges: JSON.stringify([]),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Flows", null, {});
	},
};
