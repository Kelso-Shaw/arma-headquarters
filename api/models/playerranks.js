const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PlayerRanks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PlayerRanks.init(
		{
			rank: DataTypes.STRING,
			order: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "PlayerRanks",
		},
	);
	return PlayerRanks;
};
