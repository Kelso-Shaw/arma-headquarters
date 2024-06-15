const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PlayerUser extends Model {
		static associate(models) {
			PlayerUser.belongsToMany(models.PlayerAttributes, {
				through: models.PlayerUserAttributes,
				foreignKey: "PlayerUserId",
				otherKey: "PlayerAttributeId",
				as: "attributes",
			});
			PlayerUser.hasMany(models.Squads, {
				foreignKey: "assigned",
				as: "squads",
			});
		}
	}
	PlayerUser.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			rank: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "PlayerUser",
		},
	);
	return PlayerUser;
};
