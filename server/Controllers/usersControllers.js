import { v4 } from "uuid"
import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { sqlConfig } from "../Config/config.js"
import jwt from "jsonwebtoken"
import { json } from "express"
import dotenv from 'dotenv'
dotenv.config()

export const createUser = async (req, res) => {
    const { full_name, username, email, password } = req.body
    const hashedPwd = await bcrypt.hash(password, 6)
    const id = v4()
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request()
            .input("id", id)
            .input("full_name", full_name)
            .input("username", username)
            .input('email', email)
            .input('password', hashedPwd)
            .execute("uspCreateUser", (error, record) => {
                if (error) {
                    res.json({
                        Error: "A user with this username or email exists. user a different one"
                    })
                }
                else {
                    res.status(201).json({
                        "data": record.recordset
                    })
                }
            })

    }
    else {
        res.json({ "data": "error connecting to db" })

    }
}


export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        const user = (await pool.request().input("username", username).execute("uspGetUserPwd", async (error, record) => {
            if (error) {
                return res.json({ Error: error })
            }
            else {
                if (record.recordset.length == 0) {
                    return res.json({ "message": "user not found " })

                }
                else {
                    const { password: hashedPwd, ...payload } = record.recordset[0]
                    const comparePwd = await bcrypt.compare(password, hashedPwd)
                    console.log("is pass correct ? ", comparePwd);
                    if (comparePwd) {
                        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "3600s" })
                        return res.json({ "message": "Login success", "token": token })
                    }
                    else {

                        return res.json({ "message": "invalid password", "data": payload })
                    }
                }
            }

        }))
        console.log(user);

    }
    else {
        res.json({ "data": "error connecting to db" })

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
                return res.json({ "users": record.recordset })
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

export const checkUser = async (req, res) => {
    console.log(req);
    res.status(200)
}