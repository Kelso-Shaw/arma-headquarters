const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PanelSettings extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PanelSettings.init(
		{
			setting: DataTypes.INTEGER,
			description: DataTypes.STRING,
			status: DataTypes.TINYINT,
		},
		{
			sequelize,
			modelName: "PanelSettings",
		},
	);
	return PanelSettings;
};
