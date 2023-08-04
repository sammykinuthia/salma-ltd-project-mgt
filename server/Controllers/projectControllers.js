import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'
import { v4 } from 'uuid'
import { DB } from "../DatabaseHelpers/index.js"


export const getProjects = async (req, res) => {
    const pool = await mssql.connect(sqlConfig)
    if (!req.info.is_admin) {
        return res.status(401).json(
            {
                status: "Error",
                message: "No Access to view projects"
            }
        )
    }

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
    const { name, description, start_date, end_date } = req.body
    const pool = await mssql.connect(sqlConfig)
    if (pool.connected) {
        pool.request()
            .input("id", id)
            .input("name", name)
            .input("description", description)
            .input("start_date", start_date)
            .input("end_date", end_date)
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

export const getProject = async (req, res) => {
    try {
        const id = req.params.id;


        const response = await DB.exec('uspGetProjectById', { id })


        if (response.recordset.length == 0) {
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

        return res.status(500).json(
            {
                status: "error",
                message: "Error Getting Project"
            }
        )

    }

}


export const assignProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            const results = pool.request()
                .input("project_id", project_id)
                .input("user_id", user_id)
                .execute("uspSetProjectUser", (error, records) => {
                    if (error) {
                        console.log(error);
                        res.json({ error })
                    }
                    else {
                        console.log(records.recordset);
                        res.json({ "data": records.recordset })
                    }
                })
        }
        else {
            res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
export const deleteProject = async (req, res) => {
    try {
        if (!req.info.is_admin) {
            return res.status(401).json(
                {
                    status: "error",
                    message: "You are not authorized to delete"
                }
            )
        }
        const id = req.params.id;
        const resp = await DB.exec('uspDeleteProject', { id })

        if (resp.rowsAffected[0] == 0) {
            return res.status(200).json(
                {
                    status: "success",
                    message: "Project Deleted Successfully"
                }
            )

        }

        return res.status(401).json(
            {
                status: "error",
                message: "Project Not Deleted"
            }
        )

    } catch (error) {

        return res.status(500).json(
            {
                status: "error",
                message: "Error Deleting"
            }
        )


    }
}

export const getAssignedProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            pool.request()
                .input("project_id", project_id)
                .input("user_id", user_id)
                .execute("uspGetProjectUserById", (error, records) => {
                    if (error) {
                        console.log(error);
                        res.json({ error })
                    }
                    else {
                        console.log(records.recordset);
                        res.json({ "data": records.recordset })
                    }
                })
        }
        else {
            res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
export const getUserProject = async (req, res) => {
    try {
        const user_id = req.info.id;
        const response = await DB.exec('uspGetUserProject', { user_id })

        if (response.recordset.length == 0) {
            return res.status(404).json(
                {
                    status: "Error",
                    message: "User Has No Project"
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

        return res.status(500).json(
            {
                status: "error",
                message: "Error Fetching Project"
            }
        )


    }
}

export const getUserProjectsHistory = async (req, res) => {
    try {
        const user_id = req.info.id;

        const resp = await DB.exec('uspGetUserProjectHistory', { user_id })
        if (resp.recordset.length == 0) {
            return res.status(404).json(
                {
                    status: "error",
                    message: "No Project History Found"
                }
            )

        }
        else {
            return res.status(200).json(
                {
                    status: "success",
                    projects: project.recordset
                }
            )

        }
    } catch (error) {
        return res.status(500).json(
            {
                status: "error",
                message: "Error fetching projects"
            }
        )



    }
}

export const assignUserProject = async (req, res) => {
    console.log("assign user");
}