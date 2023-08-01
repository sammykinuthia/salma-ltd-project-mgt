import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'
import { v4 } from 'uuid'

export const getProjects = async (req, res) => {

    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request().execute("uspGetProjects", (error, records) => {
            if (error) {
                return res.json(error)
            }
            else {
                if (records.recordset.length == 0)
                    return res.json({ "message": "not projects" })
                return res.json({ "data": records.recordset })

            }
        })
    }
    else {
        return res.json({ Error: "error connecting to db" })
    }
}

export const createProject = async (req, res) => {
    const id = v4()
    const {name, description, start_date,end_date} = req.body
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request()
        .input("id",id)
        .input("name",name)
        .input("description",description)
        .input("start_date",start_date)
        .input("end_date",end_date)
        .execute("uspCreateProject", (error, records) => {
            if (error) {
                return res.json(error)
            }
            else {
                if (records.recordset.length == 0)
                    return res.json({ "message": "not projects" })
                return res.json({ "data": records.recordset })

            }
        })
    }
    else {
        return res.json({ Error: "error connecting to db" })
    }
}

