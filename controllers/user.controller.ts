import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
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
    console.log(req)
   try{
await codeController.addtooutfit({
    Uniqeid,amount,outfitid
},res)
   }catch(error){
    commonController.errorMessage("occuerd err",res)
   }
}

// add to userbikes outfit

async addtoutfitbike(req:Request,res:Response){
    const{Uniqeid,amount,outfitid}=req.body;
    console.log(req)
   try{
await codeController.addtoutfitbike({
    Uniqeid,amount,outfitid
},res)
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



}


export default new UserController();