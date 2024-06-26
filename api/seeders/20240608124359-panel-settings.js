/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Delete any existing records with the setting "Registering"
		await queryInterface.bulkDelete(
			"PanelSettings",
			{ setting: "Registering" },
			{},
		);

		// Insert the new record
		await queryInterface.bulkInsert(
			"PanelSettings",
			[
				{
					setting: "Registering",
					description:
						"Enable or Disable registering on the website (does not affect panel)",
					status: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		// Remove the record in the down function as well
		await queryInterface.bulkDelete(
			"PanelSettings",
			{ setting: "Registering" },
			{},
		);
	},
};
