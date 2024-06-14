const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PlayerAttributes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Define association here
			PlayerAttributes.belongsToMany(models.PlayerUser, {
				through: models.PlayerUserAttributes,
				foreignKey: "PlayerAttributeId",
				otherKey: "PlayerUserId",
				as: "users",
			});
		}
	}
	PlayerAttributes.init(
		{
			attribute: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "PlayerAttributes",
		},
	);
	return PlayerAttributes;
};
