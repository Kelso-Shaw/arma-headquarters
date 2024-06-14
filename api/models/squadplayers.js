'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SquadPlayers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SquadPlayers.init({
    squadId: DataTypes.INTEGER,
    playerUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SquadPlayers',
  });
  return SquadPlayers;
};