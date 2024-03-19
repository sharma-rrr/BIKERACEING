import express ,{ Request, Response, NextFunction} from 'express';
var cron = require('node-cron');
var cors:any = require('cors');

 import auth from './middleware/auth';
// cronjob
import cronjob from './controllers/cron'

import userRoute from './routes/user.routes'
import memberRoute from './routes/member.routes'
import adminRoute from './routes/admin.routes'

// import {validationError} from './helpers/validator.controller';

const app=express();
app.options('*', cors());
const server = require('http').createServer(app);

const port =process.env.PORT||4000;
app.get("/", function (req,res) {
  res.send("Response from the GET request")
  });
import db from './models';

app.use(express.json());
app.use(express.static('resources'));

//for image start
app.use("/profile", express.static(__dirname + "/profile"));
//end

// app.use('/images',express.static(__dirname+'/resources/static/assets/uploads'))
//  app.use('/api/v1',)
 app.use('/api/v1/auth',userRoute);
 app.use('/api/v1/member',auth,memberRoute);
 app.use('/api/v1/admin',auth,adminRoute);

 app.get("/api/v1/welcome", auth, (req, res) => {
  res.status(200).send("data get successfully ");
});

// app.use('/api/v1/nft',nftRoute);
// app.use(validationError);

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use((err:any, req:Request, res:Response, next:any) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err } });
});


  
 db.sequelize.sync().then(()=>{
  server.listen(port,async()=>{
    console.log('App Started');
  

    // Schedule the cron job to run every night at 11:59 PM
  cron.schedule('59 23 * * *',async () => {
  console.log('running a task every 12pm');
  await cronjob.updateDailyRewards()
});

  })
 });


