import { v4 } from "uuid"
import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { sqlConfig } from "../Config/config.js"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import {DB} from "../DatabaseHelpers/index.js"
dotenv.config()

export const createUser = async(req, res) =>{
    
    try {

        const { full_name, username, email, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 6)
        const id = v4()
        const code_id = v4()
        const code = v4().slice(0, 6)
        const resp = await DB.exec('uspCreateUser',{id,full_name,username,email,'password':hashedPwd,});
        const user_id = resp.recordset[0]['id']
        const codeResp = await DB.exec('uspAddVerificationCode',{id:code_id, user_id, code, })
        
        return res.status(201).json({
             "status": "success",
             "data": resp.recordset
        })
    
    } catch (error) {
        if(error.number == 2627){
            return res.status(400).json(
                {
                    
                    message: "A user with this username or email exists. user a different one"
                }
            )

        }
        return res.status(500).json(
            
            {
                status: "error",
                // message: "Error adding user"
                'message':error
            }
        )
    }
}


export const loginUser = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        if(!username){
            return res.status(401).json(
                {
                    status: "error",
                    message: "Body Must have username"
                }
            )

        }
        if(!password){
            return res.status(401).json(
                {
                    status: "error",
                    message: "Body Must have password"
                }
            )

        }
        const record = await (DB.exec('uspGetUserPwd',{username}))
        
       
        if (record.recordset.length == 0) {
        
            return res.status(404).json(
                {
                    status: "error",
                    message: "Seems You Do Not have An Account "
                }
            )

        }
        if(record.recordset[0].is_verified == 0){
            return res.status(401).json(
                {
                    status: "error",
                    message: "Seems Your Account is unverified"
                }
            )
        }
        else{
            const { password: hashedPwd, ...payload } = record.recordset[0];
            const comparePwd = await bcrypt.compare(password, hashedPwd);

            if (comparePwd) {
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "3600s" })
                
                return res.status(200).json({
                    status: "success",
                    data: {
                        user:{
                            id: record['recordset'][0]['id'],
                            user_name: record['recordset'][0]['user_name'],
                            full_name: record['recordset'][0]['full_name']
                         },
                        message: "Login success",
                        "token": token
                        }
                    })
            }
            else{
                return res.status(403).json({
                    status: "error",
                    message: "Password is not correct"
                })
            }
          
        }

        
    } catch (error) {
        
        return res.status(500).json(
            {
                status: "error",
                message: "Error Trying to log in"
            }
        )
    }
        
   
}

export const getUsers = async (req, res) => {
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request().execute("uspGetUsers", (error, record) => {
            if (error) {
                return res.json({ Error: error })
            }
            else {
                return res.json({ "users": record })
            }
        })

    }
    else {
        return res.json({ Error: "couldn't connect to db" })

    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request().input("id", id).execute("uspGetUser", (error, record) => {
            if (error) {
                return res.json({ Error: error })
            }
            else {
                if (record.recordset.length == 0)
                    return res.json({ Error: "user with that id not found" })
                else
                    return res.json({ "user": record.recordset })
            }
        })

    }
    else {
        return res.json({ Error: "couldn't connect to db" })

    }
}

const checkUser = async (req, res) => {
    try {
        return res.json(req.info)

    }
    catch (error) {
        return res.json(error)
    }

}



const verifyEmail = async(req,res)=>{
    try {
        const { id, code } = req.body;

        const response = await DB.exec('uspVerifyTokenExists',{id,code});

        if(response.recordset.length == 0){

            return res.status(404).json(
                {
                    status: "error",
                    message: "Invalid Code"
                }
            )
        
            
        }
        else{
        const respo = await DB.exec('uspUpdateVerificationTokenVerifiedAt',{user_id:response.recordset[0].id});
        await DB.exec('uspUpdateIsVerified',{id})

            return res.status(200).json(
                {
                 status: "success",
                    message: "Account Verified Successfully"
                }
        )

        }
        
    } catch (error) {
        
        return res.status(400).json(
            {
             status: "Error",
             message: "Error Processing Code"
            }
        )
    }

}


export {checkUser, verifyEmail}