module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("PlayerUserAttributes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			PlayerUserId: {
				type: Sequelize.INTEGER,
				references: {
					model: "PlayerUsers",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				allowNull: false,
			},
			PlayerAttributeId: {
				type: Sequelize.INTEGER,
				references: {
					model: "PlayerAttributes",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				allowNull: false,
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

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("PlayerUserAttributes");
	},
};
