import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
var otpGenerator = require('otp-generator');
const QRCode = require('qrcode');
const multer = require('multer');

import { v4 as uuidv4 } from "uuid";

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});


// var bcryptjs= require('bcryptjs');

import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
import { body, Result } from 'express-validator';
import { exists } from 'fs';
import { Encrypt } from '../common/encryptpassword';
import { error } from 'console';
import { TokenExpiredError } from 'jsonwebtoken';
import { uniqueSort } from 'jquery';
import { json } from 'sequelize';
class CodeController {

    ///Section User Start

    async addNewUser(payload: any, res: Response) {
        const { id, Uniqeid } = payload;
        try {
            if (!id || id.length <= 0) {
              
                const uniqueId = commonController.generateString(10);
                const newUser = await db.User.create({
                    Uniqeid: uniqueId
                });
    
                console.log(newUser, "New user created");
                const outfitAlreadySelected = await db.Selectoutfit.findOne({
                    where: {
                        userId: newUser.id
                    }
                });
    
                // If an outfit is found, return an error message
                if (outfitAlreadySelected) {
                    return commonController.errorMessage("Outfit already selected", res);
                }
               
                 const ww="[1]"
                await db.Selectoutfit.create({
                    selectoutfit: 1,
                    userId: newUser.id,
                    availableoutfit:ww
                });
    
               
                const bikeAlreadySelected = await db.UserBikes.findOne({
                    where: {
                        userId: newUser.id
                    }
                });
    
               
                if (!bikeAlreadySelected) {
                    const hh="[1]"
                    await db.UserBikes.create({
                        selectbike: 1,
                        userId: newUser.id,
                        availablebike:hh

                    });
                }
                commonController.successMessage(newUser, "Unique ID is created", res);
            } else {
          
                const foundUser = await db.User.findOne({
                    where: {
                        Uniqeid: id
                    }
                });
    
                if (foundUser) {
                    
                    commonController.successMessage(foundUser, "User information retrieved", res);
                } else {
                   
                    commonController.errorMessage("User not found", res);
                }
            }
        } catch (error) {
            console.error(error);
            commonController.errorMessage("An error occurred", res);
        }
    }
    
// update levels

async updatelevel(payload: any, res: Response) {
    const { Uniqeid, levels } = payload;
    console.log(payload, "***&*&*&*");
    try {
        const user = await db.User.findOne({ 
            where: {
                Uniqeid
            }
        });
        console.log(user, "$$$*");
        if (user) {
            await user.update({
                levels
            });
            commonController.successMessage(user, "User levels updated successfully", res);
        } else {
            commonController.errorMessage("User  Uniqeid is not found", res);
        }
    } catch (error) {
        console.log(error, "s");
        commonController.errorMessage("An error occurred", res);
    }
}

//  user update shileld
async updateshileld(payload: any, res: Response) {
    const { Uniqeid, shileld } = payload;
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });
        if (!user) {
            commonController.errorMessage("User unique id not found", res);
        } else {
            await user.update({
                shileld
            });
            commonController.successMessage(user, "User shield updated successfully", res);
        }
    } catch (err) {
        console.error(err);
        commonController.errorMessage("An error occurred", res);
    }
}

async updatebuster(payload: any, res: Response) {
    const { Uniqeid, buster } = payload;
    try {
        const moon = await db.User.findOne({
            where: {
                Uniqeid
            }
        });
        if (!moon) {
            commonController.errorMessage("User unique id not found", res);
        } else {
            await moon.update({
                buster
            });
            commonController.successMessage(moon, "User buster updated successfully", res);
        }
    } catch (err) {
        console.error(err);
        commonController.errorMessage("An error occurred", res);
    }
}



 
async nameupdate(payload:any,res:Response){
    const{name,Uniqeid}=payload;
    console.log(payload, "***&*&*&*");
    try {
        const sun = await db.User.findOne({ 
            where: {
                Uniqeid
            }
        });
        
        if (sun) {
            await sun.update({
                name
            });
            commonController.successMessage(sun, "User name updated successfully", res);
        } else {
            commonController.errorMessage("User  Uniqeid is not found", res);
        }
    } catch (error) {
        console.log(error, "s");
        commonController.errorMessage("An error occurred", res);
    }
}

// add daily reward users
async addAmount(payload: any, res: Response) {
    const { Uniqeid, amount,Money } = payload;
    try {
        const user = await db.User.findOne({ 
            where: {
                Uniqeid
            }
        });
        if (!user) {
            return commonController.errorMessage("User  unique id not found", res);
        }
        const updatedMoney = user.Money + amount;
        await user.update({
            Money: updatedMoney,Dailyreward:true
        });
        commonController.successMessage(user, "Amount added successfully", res);
    } catch (err) {
        console.error(err);
        commonController.errorMessage("An error occurred", res);
    }
}


async getdataall (payload:any,res:Response){
    const{id}=payload;
    try{
            var sql = `SELECT a.Money, a.Uniqeid, a.shileld, a.levels, a.isPurchase,
             a.buster, a.name AS user_name, a.Dailyreward, b.userId AS userbikesuserid, b.selectbike, 
             b.availablebike, c.userId AS suserid , c.availableoutfit, c.selectoutfit FROM users a 
             LEFT JOIN userbikes b ON a.id = b.userId LEFT JOIN 
            selectoutfits c ON a.id = c.userId WHERE a.Uniqeid='${id}' `;
            var result = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            commonController.successMessage(result,"get all perfile data",res)
    }catch(err){
     commonController.errorMessage("occuerd error",res)
    }
}

async addtooutfit(payload: any, res: Response) {
    const { outfitid, amount, Uniqeid, } = payload;
    console.log(payload, "pay**");
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });

        if (user) {
            const updatedMoney = user.Money - amount;
            await user.update({
                Money: updatedMoney
            });

        
            const moon = await db.Selectoutfit.findOne({
                where: {
                    userId: user.id
                }
            });

     
           const availableOutfitArray = JSON.parse(moon.availableoutfit || '[]');
           availableOutfitArray.push(outfitid);
           
            let ss=JSON.stringify(availableOutfitArray)

            await moon.update({
                availableoutfit: ss, userId: user.id
            });

            commonController.successMessage(moon, "Outfit updated successfully", res);
        }
    } catch (error) {
        console.error(error);
        commonController.errorMessage("An error occurred", res);
    }
}

// add to user bikes outfit
async addtoutfitbike(payload: any, res: Response) {
    const { outfitid, amount, Uniqeid } = payload;
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });

        if (user) {
            const updatedMoney = user.Money - amount;
            await user.update({
                Money: updatedMoney
            });

            const userbike = await db.UserBikes.findOne({
                where: { 
                    userId: user.id
                }
            });

                let addbike = JSON.parse(userbike.availablebike || '[]');
                addbike.push(outfitid);                                                                                                             
                let ss=JSON.stringify(addbike)

                await userbike.update({
                    availablebike: ss
                });

                commonController.successMessage(userbike, "User bike updated successfully", res);
            }
    } catch (error) {
        console.error(error);
        commonController.errorMessage("An error occurred", res);
    }
}

// changeUniqeid convert into email
async  change(payload: any, res: Response) {
    const { Uniqeid, email } = payload;
    console.log(payload, "***&&*");
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });
        console.log(user, "%%$$$$");
        if (user) {
            await user.update({
                Uniqeid: email
            });
          
            commonController.successMessage(user, " change Uniqeid convert into email", res);
        }else{
            commonController.errorMessage("Uniqeid not found",res)
        }
    } catch (error) {

        commonController.errorMessage("An error occurred", res);
    }
}


}


  
  

export default new CodeController();
// export default new hello();
