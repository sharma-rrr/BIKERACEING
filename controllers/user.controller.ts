import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
import db from '../models';
// import userController from "../controllers/user.controller";
import { error } from 'console';
class UserController {
    async register(req: Request, res: Response) {
        try {
            const {Uniqeid } = req.body;
                await codeController.addNewUser({
                    Uniqeid
                }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }

// update levels 
async updatelevels(req:Request,res:Response){
    const{Uniqeid,levels}=req.body;
    try{
        await codeController.updatelevel({
            Uniqeid,levels
        },res)

    }catch(error){
        commonController.errorMessage("occuerd error",res)
    }
}


// update user shileld
async updateshileld(req:Request,res:Response){
    const{Uniqeid,shileld}=req.body;
    try{
     await codeController.updateshileld({
        Uniqeid,shileld
     },res)
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}

async updatebuster(req:Request,res:Response){
    const{Uniqeid,buster}=req.body;
    try{
     await codeController.updatebuster({
        Uniqeid,buster
     },res)
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}


// update name
async updatename(req:Request,res:Response){
    const{Uniqeid,name}=req.body;
    try{
     await codeController.nameupdate({
        Uniqeid,name
     },res)
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}
async updateAllData(req:Request,res:Response){
    const{Uniqeid,name,shileld,levels,buster}=req.body;
    try{
     await codeController.updateAllData({
        Uniqeid,name,shileld,levels,buster
     },res)
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}

// add daily reward amount user
async adddailyrewardamount (req:Request,res:Response){
    const{Uniqeid,amount,}=req.body;
    try{
 await codeController.addAmount({
    Uniqeid,amount
 },res)
    }catch(err){
        commonController.errorMessage("occuerd err",res)
    }
}


async usedailyreward(req:Request,res:Response){
    const{Uniqeid,amount,}=req.body;
    try{
 await codeController.usedailyreward({
    Uniqeid,amount
 },res)
    }catch(err){
        commonController.errorMessage("occuerd err",res)
    }
}

// get all data
async getdata(req:Request,res:Response){
    const{id}=req.body;
   try{
await codeController.getdataall({
id
},res)
   }catch(error){
    commonController.errorMessage("occuerd err",res)
   }
}

// add outfit
async addtooutfit(req:Request,res:Response){
    const{Uniqeid,amount,outfitid}=req.body;
    
   try{
    const user=await db.User.findOne({
        where:{
            Uniqeid
        }
    })
    console.log("ddgggg",user.Money)
    if(user.Money >amount){
        await codeController.addtooutfit({
            Uniqeid,amount,outfitid
        },res)
    }else{
        commonController.errorMessage("amount is lessthen product price",res)
    }

   }catch(error){
    commonController.errorMessage("occuerd err",res)
   }
}

// add to userbikes outfit

async addtoutfitbike(req:Request,res:Response){
    const{Uniqeid,amount,availablebike}=req.body;
    console.log(req)
   try{
   const user=await db.User.findOne({
    where:{
        Uniqeid
    }
   })
   if(user.Money>amount){
    await codeController.addtoutfitbike({
        Uniqeid,amount,availablebike
    },res)
   }
else{
    commonController.errorMessage("please check amount",res)
}
   }catch(error){
    commonController.errorMessage("occuerd err",res)
   }
}

// changeUniqeid convert into email
async changeUniqeid(req:Request,res:Response){
    const{Uniqeid,email}=req.body;
    try{
       await codeController.change({
        Uniqeid,email
       },res)
    }catch(err){
        commonController.errorMessage("occuerd err",res)
    }

}

// add user bike speed
async updatespeed(req:Request,res:Response){
   const { amount,Uniqeid  ,maxspeed,handling,bikeid,acceleration,currentspeed}=req.body;

    try{
        const user=await db.User.findOne({
            where:{
                Uniqeid
            }
           })
           console.log(user.Money,"dhhdgdghgfy")
           if(user.Money>amount){
            await codeController.updatespeed({
                amount,Uniqeid  ,maxspeed,handling,bikeid,acceleration,currentspeed
            },res)
           }
        else{
            commonController.errorMessage("please check amount",res)
        }
    }catch(error){
        commonController.errorMessage("occuerd error",res)
    }

}


async updateoutfit(req:Request,res:Response){
    const{selectoutfit,Uniqeid}=req.body;
    try{
       await codeController.updateoutfit({
        selectoutfit,Uniqeid
       },res)
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}
async changebike(req:Request,res:Response){
    const{selectbike,Uniqeid}=req.body;
    try{
       await codeController.changebike({
        selectbike,Uniqeid
       },res)
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}


// add manages ( admin api )
async adds( req:Request,res:Response){
    const{applovinSdkkey,appopen,Banneradd,interstialId,RewardId}=req.body;
    
    try{
    await codeController.addsmanage({
        applovinSdkkey,appopen,Banneradd,interstialId,RewardId
    },res)
    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}




// get all  addsmanage ( admin api )

async getadds(req:Request,res:Response){
try{

    await codeController.getadds({

    },res)
  
}catch(e){
    commonController.errorMessage("occuerd err",res)
}

}

// login admin
async  login(req:Request,res:Response){
    const{email,password}=req.body;
    console.log(req.body,"retersvfsg")
    try{
        await codeController.login({
            email,password
        },res)
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}

//  admin api get all users

async getallusers(req:Request,res:Response){
 
    try{
await codeController.getallusers({

},res)

    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}

async deleteuser(req:Request,res:Response){
 const{id}=req.body;
    try{
await codeController.deleteUser({
    id
},res)

    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}



}
export default new UserController();