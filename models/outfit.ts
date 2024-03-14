'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{
 userId:string;
 selectoutfit:string;
availableoutfit:string;
 
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  outfit extends Model<UserOtpAttributes>
  implements UserOtpAttributes {
    userId!:string;
    selectoutfit!:string;
    availableoutfit!:string;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  outfit.init({
    userId: {type:DataTypes.STRING},
    selectoutfit: {type:DataTypes.STRING},
availableoutfit: {type:DataTypes.STRING},
 
  }, {
    sequelize,
    modelName: 'Selectoutfit',
  });
  return  outfit;
};
