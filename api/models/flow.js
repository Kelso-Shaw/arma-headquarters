module.exports = (sequelize, DataTypes) => {
	const Flow = sequelize.define("Flow", {
		nodes: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		edges: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	});
	return Flow;
};
