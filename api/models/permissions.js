module.exports = (sequelize, DataTypes) => {
	const Permissions = sequelize.define(
		"Permissions",
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			page_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			can_access: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{},
	);

	Permissions.associate = (models) => {
		// associations can be defined here
		Permissions.belongsTo(models.Users, {
			foreignKey: "user_id",
			onDelete: "CASCADE",
		});
		Permissions.belongsTo(models.Pages, {
			foreignKey: "page_id",
			onDelete: "CASCADE",
		});
	};

	return Permissions;
};
