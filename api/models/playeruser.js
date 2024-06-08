const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PlayerUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PlayerUser.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			name: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "PlayerUser",
		},
	);
	return PlayerUser;
};
