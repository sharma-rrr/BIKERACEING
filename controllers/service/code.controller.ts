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
import { cpuUsage } from 'process';
import { Json } from 'sequelize/types/lib/utils';
class CodeController {

    ///Section User Start

    async addNewUser(payload: any, res: Response) {
        const { id, Uniqeid } = payload;
        try {
            if (!id || id.length <= 0) {
              
                const uniqueId = commonController.generateString(10);
                const biker_names = [
                    "Max", "Jake", "Mia", "Ryder", "Zoe", "Axel", "Luna", "Blaze",
                    "Kai", "Nova", "Jax", "Phoenix", "Raven", "Diesel", "Storm", "Jade",
                    "Ace", "Sky", "Ember", "Hunter", "Lex", "Willow", "Titan", "Scarlett", "Orion"
                ];
                
                // Generate a random index to select a name from the array
                const randomIndex = Math.floor(Math.random() * biker_names.length);
                const randomName = biker_names[randomIndex];
                
                const newUser = await db.User.create({
                    Uniqeid: uniqueId,
                    name: randomName 
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
                const maxrace=await db.bikeattribute.findOne({
                    where:{
                        userId:newUser.id
                    }
                })
                const moon=await db.bikeattribute.create({
                    maxspeed:500,handling:50,bikeid:1, userId:newUser.id,acceleration:100,currentspeed:400
                })
                const moon1=await db.bikeattribute.create({
                    maxspeed:540,handling:70,bikeid:2, userId:newUser.id,acceleration:110,currentspeed:440
                })
                const moon2=await db.bikeattribute.create({
                    maxspeed:580,handling:20,bikeid:3, userId:newUser.id,acceleration:140,currentspeed:480
                })
                const moon3=await db.bikeattribute.create({
                    maxspeed:560,handling:40,bikeid:4, userId:newUser.id,acceleration:120,currentspeed:460
                })
                const moon4=await db.bikeattribute.create({
                    maxspeed:600,handling:10,bikeid:5, userId:newUser.id,acceleration:150,currentspeed:500
                })
                const moon5=await db.bikeattribute.create({
                    maxspeed:530,handling:60,bikeid:6, userId:newUser.id,acceleration:170,currentspeed:430
                })
                const moon6=await db.bikeattribute.create({
                    maxspeed:650,handling:80,bikeid:7, userId:newUser.id,acceleration:125,currentspeed:550
                })
                var sql = `SELECT a.Money, a.Uniqeid, a.shileld, a.levels, a.isPurchase,
                a.buster, a.name AS user_name, a.Dailyreward, b.selectbike, 
                b.availablebike , c.availableoutfit, c.selectoutfit FROM Users a 
                LEFT JOIN UserBikes b ON a.id = b.userId LEFT JOIN 
                Selectoutfits c ON a.id = c.userId WHERE a.Uniqeid='${newUser.Uniqeid}' `;
               var userdata = await MyQuery.query(sql, { type: QueryTypes.SELECT });
              
               var sqlBikeAttributes = `SELECT * FROM bikeattributes WHERE userId='${newUser.id}'`;
               var bikeattribute = await MyQuery.query(sqlBikeAttributes, { type: QueryTypes.SELECT });
               console.log(bikeattribute,"%%^^&***(*")
               commonController.successMessage({userdata,bikeattribute},"get all perfile data",res)
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
async updateAllData(payload:any,res:Response){
    const{ Uniqeid,name,shileld,levels,buster}=payload;
    console.log(payload, "***&*&*&*");
    try {
        const sun = await db.User.findOne({ 
            where: {
                Uniqeid
            }
        });
        
        if (sun) {
            await sun.update({
                name,shileld,levels,buster
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
        
        const updatedMoney = user.Money +  JSON.parse(amount)
        await user.update({
            Money: updatedMoney,
        });
        commonController.successMessage(user, "Amount added successfully", res);
    } catch (err) {
        console.error(err);
        commonController.errorMessage("An error occurred", res);
    }
}


async usedailyreward(payload: any, res: Response) {
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
        
        const updatedMoney = user.Money +  JSON.parse(amount)
        await user.update({
            Money: updatedMoney,Dailyreward:true
        });
        commonController.successMessage(user, "Amount added successfully", res);
    } catch (err) {
        console.error(err);
        commonController.errorMessage("An error occurred", res);
    }
}



// get all users data 
async getdataall (payload:any,res:Response){
    const{id}=payload;
    try{
            var sql = `SELECT a.Money, a.Uniqeid, a.shileld, a.levels, a.isPurchase,
             a.buster, a.name AS user_name, a.Dailyreward, b.selectbike, 
             b.availablebike , c.availableoutfit, c.selectoutfit FROM Users a 
             LEFT JOIN UserBikes b ON a.id = b.userId LEFT JOIN 
             Selectoutfits c ON a.id = c.userId WHERE a.Uniqeid='${id}' `;
            var userdata = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            const sun=await db.User.findOne({
                where:{
                    Uniqeid:id
                }
            })
            var sqlBikeAttributes = `SELECT * FROM bikeattributes WHERE userId='${sun.id}'`;
            var bikeattribute = await MyQuery.query(sqlBikeAttributes, { type: QueryTypes.SELECT });
            console.log(bikeattribute,"%%^^&***(*")
          
            commonController.successMessage({userdata,bikeattribute},"get all perfile data",res)
    }catch(err){
     commonController.errorMessage("occuerd error",res)
    }
}

async addtooutfit(payload: any, res: Response) {
    const { outfitid, amount, Uniqeid, } = payload;
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });

        if (user) {
            const updatedMoney = user.Money - JSON.parse(amount);
            await user.update({
                Money: updatedMoney
            });

        
            const moon = await db.Selectoutfit.findOne({
                where: {
                    userId: user.id
                }
            });

            let sun = JSON.parse(outfitid)
           const availableOutfitArray = JSON.parse(moon.availableoutfit || '[]');
           availableOutfitArray.push(sun);
           
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
    const { availablebike, amount, Uniqeid } = payload;
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });

        if (user) {
            const updatedMoney = user.Money - JSON.parse(amount);


            await user.update({
                Money: updatedMoney
            });

            const userbike = await db.UserBikes.findOne({
                where: { 
                    userId: user.id
                }
            });

            let moon = JSON.parse(availablebike)
                let addbike = JSON.parse(userbike.availablebike || '[]');
                addbike.push(moon);                                                                                                             
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

//  add user bike speed 
async  updatespeed(payload, res) {
    const { amount, Uniqeid, maxspeed, handling, bikeid, acceleration ,currentspeed} = payload;
    console.log("pay****", payload);
    try {
        const user = await db.User.findOne({
            where: {
                Uniqeid
            }
        });
           console.log(user,"user****&*&*")
        if (user) {
            const lessamount = user.Money - JSON.parse(amount);
            await user.update({
                Money: lessamount
            });
            const atributebike = await db.bikeattribute.findOne({
                where: {
                    userId: user.id,
                    bikeid:bikeid
                }
            });

            const newMaxSpeed = atributebike.maxspeed + JSON.parse(maxspeed);
            const newHandling = atributebike.handling +  JSON.parse(handling);
            const newAcceleration = atributebike.acceleration +  JSON.parse(acceleration);
            const newcurrentspeed=atributebike.currentspeed + JSON.parse(currentspeed)

            await atributebike.update({
                maxspeed: newMaxSpeed,      
                handling: newHandling,
                acceleration: newAcceleration,
                currentspeed:newcurrentspeed
            });
            commonController.successMessage(atributebike, "update bikeattributes data", res);   
        } else {
            commonController.errorMessage("User not found", res);
        }
    } catch (err) {
        console.log(err,"&&&")
        commonController.errorMessage("An error occurred", res);
    }
}

// update outfit 

async updateoutfit(payload:any,res:Response){
    const{selectoutfit,Uniqeid}=payload;
    try{
      const user=await db.User.findOne({
        where:{
            Uniqeid
        }
      })
      if(user){
        const outfit=await db.Selectoutfit.findOne({
         where:{
            userId:user.id
         }
        })
        await outfit.update({
             selectoutfit
        })
        commonController.successMessage(outfit,"users outfit updated successfully",res)
      }
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}
async changebike(payload:any,res:Response){
    const{selectbike,Uniqeid}=payload;
    try{
      const user=await db.User.findOne({
        where:{
            Uniqeid
        }
      })
      if(user){
        const outfit=await db.UserBikes.findOne({

          where:{
            userId:user.id
          }
        })
        await outfit.update({
            selectbike
        })
        commonController.successMessage(outfit,"users selectbike updated successfully",res)
      }
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}




// adds manage( admin api )
async addsmanage(payload:any,res:Response){
    const{id, applovinSdkkey,appopen,Banneradd,interstialId,RewardId}=payload;
    console.log("payload",payload)
    try{

        const add=await db.AddManage.findOne({
            where:{
                id:1
            }
        })
        if(add){
            await add.update({
                applovinSdkkey,appopen,Banneradd,interstialId,RewardId
            })
            commonController.successMessage(add,"ADDS UPDATED SUCCESSFULLY",res)
        }else{
            const addcreate=await db.AddManage.create({
                applovinSdkkey,appopen,Banneradd,interstialId,RewardId
            })
            commonController.successMessage(addcreate,"data create successfully",res)
        }
           
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}


// get adds ( admin api )
async getadds(payload:any,res:Response){
    try{
    var sql = ` SELECT * FROM AddManages where id= 1;`
    var getadds = await MyQuery.query(sql, { type: QueryTypes.SELECT });
    commonController.successMessage(getadds,"get adds data",res)
}catch(err){
    commonController.errorMessage("occuerd error",res)
}

}

   // admin login api
   async login(payload: any, res: Response) {
    const { email, password } = payload;
    console.log(payload,"pay))))")
    try {
        if (email === 'airai@gmail.com' && password === 'airai123') {
            const token = jwt.sign({
                email, admin: true,
            }, process.env.TOKEN_SECRET);
       
            commonController.successMessage(token, "token created", res)
            
        } else {
            commonController.errorMessage('Invalid email or password', res);
        }
    } catch (error) {
        console.log(error, "er**^&")
        commonController.errorMessage("occuerd error", res)
    }
}



// get all users( admin api )
async getallusers(payload:any,res:Response){
    try{
        var getusers=`SELECT * FROM bikerace.Users;`
        var userdata = await MyQuery.query(getusers, { type: QueryTypes.SELECT });
        console.log(userdata,"***&*&&*")
        commonController.successMessage(userdata,"get all users",res)
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}


// delete user (admin api)
async  deleteUser(payload: any, res: Response) { 
    const { id } = payload;
    console.log(id,"payload***&*")
    try {
        const user=await db.User.findOne({
            where:{
                Uniqeid:id
            }
        })
        console.log("user**",user)
        const deleteUserQuery = `DELETE FROM Users WHERE Uniqeid='${id}';`;
        const userDeleted = await MyQuery.query(deleteUserQuery, { type: QueryTypes.DELETE });
        const deleteUserQuery1 = `DELETE FROM bikeattributes WHERE userId='${user.id}';`;
        const userattribute = await MyQuery.query(deleteUserQuery1, { type: QueryTypes.DELETE });
        console.log(userattribute,"#$#$$$$$&**")
        commonController.successMessage({userDeleted,userattribute}," user delete  successfully", res);
    } catch (err) {
        console.log(err,"sgdhduhggh")
        commonController.errorMessage("An error occurred", res);
    }
}


}

export default new CodeController();
// export default new hello();
