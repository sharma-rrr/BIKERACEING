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

// add Adds
router.post("/addmanage",userController.adds);

// get ADDSMANAGE DATA
router.post("/GETmanagedata",userController.getadds);


// get all users
router.post("/getallusers",userController.getallusers);

// delete user
router.post("/deleteus er",userController.deleteuser);




export default router;

