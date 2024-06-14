const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const PlayerUserAttributes = sequelize.define(
		"PlayerUserAttributes",
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
		{},
	);
	return PlayerUserAttributes;
};
