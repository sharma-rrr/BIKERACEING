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

//user update bhuster

router.post("/updatebuster",userController.updatebuster);

// user update name

router.post("/usernameupdate",userController.updatename);


// add amount in daily reward of users

router.post("/addamount",userController.adddailyrewardamount);

// get all data 

router.post("/getprofiledata",userController.getdata);

// addto outfit 
router.post("/addtooutfit",userController.addtooutfit);

// add to outfit in userbikes
 
router.post("/addtoutfitbike",userController.addtoutfitbike);

//Uniqeid convert into email 
router.post("/changeUniqeid",userController.changeUniqeid);


export default router;

