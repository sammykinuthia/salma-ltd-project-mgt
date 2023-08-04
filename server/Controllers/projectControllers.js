import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'
import { v4 } from 'uuid'
import {DB} from "../DatabaseHelpers/index.js"
export const getProjects = async (req, res) => {

    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request().execute("uspGetProjects", (error, records) => {
            if (error) {
                return res.json(error)
            }
            else {
                if (records.recordset.length == 0)
                    return res.json({ "message": "no projects" })
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

export const getProject = async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id)

        const response = await DB.exec('uspGetProjectById',{id})
        console.log(response)

        if(response.recordset.length == 0){
            return res.status(404).json(
                {
                    status: "Error",
                    message: "Project Not Found"
                }
            )
        }
        return res.status(200).json(
            {
                status: "success",
                project: response['recordset']
            }
        )
    


        
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                status: "error",
                message: "Error Getting Project"
            }
        )
        
    }

}

export const assignProject = async(req, res)=>{
    try {
        const {user_id, project_id} = req.body
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            const results = pool.request()
            .input("project_id",project_id)
            .input("user_id",user_id)
            .execute("uspSetProjectUser", (error, records)=>{
                if(error){
                    console.log(error);
                    res.json({error})
                }
                else{
                    console.log(records.recordset);
                    res.json({"data":records.recordset})
                }
            })
        }
        else{
            res.json({Error:"error connecting to db"})
        }
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}



export const getAssignedProject = async(req, res)=>{
    try {
        const {user_id, project_id} = req.body
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            pool.request()
            .input("project_id",project_id)
            .input("user_id",user_id)
            .execute("uspGetProjectUserById", (error, records)=>{
                if(error){
                    console.log(error);
                    res.json({error})
                }
                else{
                    console.log(records.recordset);
                    res.json({"data":records.recordset})
                }
            })
        }
        else{
            res.json({Error:"error connecting to db"})
        }
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }


}