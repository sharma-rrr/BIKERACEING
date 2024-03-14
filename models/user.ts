'use strict';
import { Model, DataTypes } from 'sequelize';

interface UserAttributes {
  Money: number;
  Uniqeid: string;
  shileld: number;
  levels: number;
  isPurchase: boolean;
  buster: number;
  name: string;
  Dailyreward: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    Money!: number;
    Uniqeid!: string;
    shileld!: number;
    levels!: number;
    isPurchase!: boolean;
    buster!: number;
    name!: string;
    Dailyreward!: boolean;

    static associate(models: any) {
      // define association here
    }
  }

  User.init({
    Money: { type: DataTypes.DOUBLE ,defaultValue:0},
    Uniqeid: { type: DataTypes.STRING },
    shileld: { type: DataTypes.INTEGER,defaultValue:0 },
    levels: { type: DataTypes.INTEGER,defaultValue:1},
    isPurchase: { type: DataTypes.BOOLEAN, defaultValue: false }  ,  
    buster: { type: DataTypes.INTEGER,defaultValue:0 },
    name: { type: DataTypes.STRING },
    Dailyreward: { type: DataTypes.BOOLEAN,defaultValue: false },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
