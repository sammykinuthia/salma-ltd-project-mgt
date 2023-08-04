import nodeCron from 'node-cron'
import { VerifyUser } from './EmailService/newUser.js';
import { AssignUser } from './EmailService/userProjectAssignment.js';


nodeCron.schedule("*/10 * * * * *", async () => {
    await VerifyUser()
    await AssignUser()
})

