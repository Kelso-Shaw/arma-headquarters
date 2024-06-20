/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Squads", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.STRING,
			},
			assigned: {
				type: Sequelize.INTEGER,
				references: {
					model: "PlayerUsers", // name of the target model
					key: "id", // key in the target model
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			order: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Squads");
	},
};
