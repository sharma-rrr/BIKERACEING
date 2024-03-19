import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";

 const multer = require("multer");
 var storage = multer.diskStorage({
  destination: function (req: any, file:any, cb: any){
    cb(null, "profile");
  },
  filename: function(req:any, file: any, cb: any) {
    cb(null, file.originalname + ".png");
  },
 });
 var upload = multer({
  storage:storage
 })

const router=express.Router();
// add  user
 router.post("/register",userController.register);

//  user update levels
 router.post("/updatelevels",userController.updatelevels);

// users update shileld

router.post("/updateshileld",userController.updateshileld);
// 


//user update bhuster

router.post("/updatebuster",userController.updatebuster);

// user update name

router.post("/usernameupdate",userController.updatename);


router.post("/updateAllData",userController.updateAllData);
// add amount in daily reward of users

router.post("/addamount",userController.adddailyrewardamount);

router.post("/usedailyreward",userController.usedailyreward);

// get all data 

router.post("/getprofiledata",userController.getdata);

// add to outfit 
router.post("/addtooutfit",userController.addtooutfit);

// add to outfit userbikes
 
router.post("/addtoutfitbike",userController.addtoutfitbike);

//Uniqeid convert into email 
router.post("/changeUniqeid",userController.changeUniqeid);

// add  bike speed race  in old bike speed race
router.post("/updatespeed",userController.updatespeed);

//change selectoutfit from outfittable/ outfitdata
router.post("/changeoutfit",userController.updateoutfit);

router.post("/changebike",userController.changebike);

//// add Adds
router.post("/loginAdmin",userController.login);




// ssh -i "card52.pem" ubuntu@ec2-52-91-251-5.compute-1.amazonaws.com
export default router;

