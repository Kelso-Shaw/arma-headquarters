const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Squads extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Squads.belongsTo(models.PlayerUser, {
				foreignKey: "assigned",
				as: "playerUser",
			});
		}
	}
	Squads.init(
		{
			name: DataTypes.STRING,
			role: DataTypes.STRING,
			assigned: {
				type: DataTypes.INTEGER,
				references: {
					model: "PlayerUsers", // name of the target model
					key: "id", // key in the target model
				},
			},
			order: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Squads",
		},
	);
	return Squads;
};
