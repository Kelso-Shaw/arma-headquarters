module.exports = (sequelize, DataTypes) => {
	const Pages = sequelize.define(
		"Pages",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{},
	);

	Pages.associate = (models) => {
		// associations can be defined here
		Pages.hasMany(models.Permissions, { foreignKey: "page_id" });
	};

	return Pages;
};
