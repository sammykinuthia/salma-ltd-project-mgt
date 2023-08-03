import nodeCron from 'node-cron'
import path from 'path'
import { VerifyUser } from './EmailService/newUser.js';


nodeCron.schedule("*/10 * * * * *",async()=>{
    console.log("Running after 10s");
   await  VerifyUser()
})


console.log();  