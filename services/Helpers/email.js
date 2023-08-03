import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const config = {
    host:"smtp.gmail.com",
    port:587,
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PWD
    }
}

export const sendMail = async (messageOption)=>{
    let transporter = nodemailer.createTransport(config)
    await transporter.verify()
    await transporter.sendMail(messageOption,(error, info)=>{
        if(error)
        console.log("ERROR SENDING MAIL---> ",error);
        console.log("EMAIL SEND SUCCESSIFULLY ---> ",info);
    })
}