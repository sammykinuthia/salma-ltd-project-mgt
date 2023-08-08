import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../Config/dbConfig.js'
import { sendMail } from '../Helpers/email.js'
dotenv.config()

export const VerifyUser = async () => {
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        console.log("..")
        const users = await (await pool.request().execute("uspGetUnSendVCodeUsers")).recordset
        for (let user of users) {
            ejs.renderFile('./Templates/verificationEmail.ejs', { username: user.username, code: user.code }, async (error, html) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const message = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Verification code",
                    html
                }
                try {
                    await sendMail(message)
                    await pool.request().input("id", user.id).execute("uspSentVCodeUser")

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


