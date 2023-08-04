import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../Config/dbConfig.js'
import { sendMail } from '../Helpers/email.js'
dotenv.config()

export const AssignUser = async () => {
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        const users = await (await pool.request().execute("uspGetProjectAssignmentMail")).recordset
        users.forEach( user=> {
            ejs.renderFile('./Templates/projectAssignmentEmail.ejs', { username: user.username, title: user.title, startDate:user.startDate, endDate:user.endDate, description:user.description }, async (error, html) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const message = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Project Assignment",
                    html
                }
                try {
                    console.log("here");
                    await sendMail(message)
                    await pool.request().input("user_id", user.user_id).input("project_id",user.project_id).execute("uspSentProjectAssignmentMail")

                } catch (error) {
                    console.log(error);
                }
            })
        })
    }
    else {
        console.log("failed to connect to db");
    }
}


