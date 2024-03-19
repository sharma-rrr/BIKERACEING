'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{
 applovinSdkkey:string;
 appopen:string;
Banneradd:string;
 interstialId:string;
 RewardId:string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  adds extends Model<UserOtpAttributes>
  implements UserOtpAttributes {
    applovinSdkkey!:string;
    appopen!:string;
   Banneradd!:string;
    interstialId!:string;
    RewardId!:string;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  adds.init({
    applovinSdkkey: {type:DataTypes.STRING},
    appopen: {type:DataTypes.STRING,defaultValue: '1'},
    Banneradd: {type:DataTypes.STRING},
    interstialId:{type:DataTypes.STRING},
    RewardId:{type:DataTypes.STRING}


 
  }, {
    sequelize,
    modelName: 'AddManage',
  });
  return  adds;
};
