'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{
 userId:number;
 maxspeed:number;
handling:number;
bikeid:number;
acceleration:number;
 currentspeed:number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  bikespeed extends Model<UserOtpAttributes>
  implements UserOtpAttributes {
    userId!:number;
    maxspeed!:number;
   handling!:number;
   bikeid!:number;
   acceleration!:number;
   currentspeed!:number;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bikespeed.init({
    userId:{type:DataTypes.INTEGER},
    maxspeed: {type:DataTypes.INTEGER,},
    handling:{type:DataTypes.INTEGER},
    bikeid:{type:DataTypes.INTEGER},
    acceleration:{type:DataTypes.INTEGER},
    currentspeed:{type:DataTypes.INTEGER}


  }, {
    sequelize,
    modelName: 'bikeattribute',
  });
  return  bikespeed;
};
