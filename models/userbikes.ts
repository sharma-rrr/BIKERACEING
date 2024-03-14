'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{
 userId:string;
 selectbike:string;
availablebike:string;
 
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  bikeuser extends Model<UserOtpAttributes>
  implements UserOtpAttributes {
    userId!:string;
    selectbike!:string;
    availablebike!:string;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bikeuser.init({
    userId: {type:DataTypes.STRING},
    selectbike: {type:DataTypes.STRING,defaultValue: '1'},
    availablebike: {type:DataTypes.STRING},
 
  }, {
    sequelize,
    modelName: 'UserBikes',
  });
  return  bikeuser;
};
