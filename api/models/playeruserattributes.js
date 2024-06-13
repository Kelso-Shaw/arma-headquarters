const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PlayerUserAttributes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Define association here
		}
	}
	PlayerUserAttributes.init(
		{
			PlayerUserId: {
				type: DataTypes.INTEGER,
				references: {
					model: "PlayerUsers",
					key: "id",
				},
			},
			PlayerAttributeId: {
				type: DataTypes.INTEGER,
				references: {
					model: "PlayerAttributes",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "PlayerUserAttributes",
		},
	);
	return PlayerUserAttributes;
};
