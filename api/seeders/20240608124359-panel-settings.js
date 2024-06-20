/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const setting = await queryInterface.rawSelect(
			"PanelSettings",
			{
				where: {
					setting: "Registering",
				},
			},
			["id"],
		);

		if (!setting) {
			await queryInterface.bulkInsert(
				"PanelSettings",
				[
					{
						setting: "Registering",
						description: "Enable or Disable registering in the panel",
						status: true,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{},
			);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(
			"PanelSettings",
			{ setting: "Registering" },
			{},
		);
	},
};
