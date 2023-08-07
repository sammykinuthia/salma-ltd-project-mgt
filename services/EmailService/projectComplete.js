import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../Config/dbConfig.js'
import { sendMail } from '../Helpers/email.js'
dotenv.config()

export const projectComplete = async () => {
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        const projects = await (await pool.request().execute("uspCompletedProjectEmail")).recordset
        for (let proj of projects) {
            ejs.renderFile('./Templates/projectComplete.ejs', { project: proj.project, startDate:proj.startDate, endDate:proj.endDate }, async (error, html) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const message = {
                    from: process.env.EMAIL,
                    to: process.env.EMAIL,
                    subject: "Project Complete",
                    html
                }
                try {
                    await sendMail(message)
                    await pool.request().input("id", proj.id).execute("uspSetSentEmail")

                } catch (error) {
                    console.log(error);
                }
            })
        }
    }
    else {
        console.log("failed to connect to db");
    }
}