import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'
import { v4 } from 'uuid'
import { DB } from "../DatabaseHelpers/index.js"
import { createProjectSchema } from '../Validators/projectValidators.js'


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
                    return res.status(404).json({ "message": "no projects" })
                return res.status(200).json({ "data": records.recordset })

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

    const {error} = createProjectSchema.validate(req.body)

    if(error){
        return res.status(422).json({
            'status': 'error',
            'message': error.message
        }
        )
    }





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
                    return res.status(200).json({ "data": records.recordset })

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



export const getProjectByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        // const response = await DB.exec('uspGetProjectByUserId', { id })
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            pool.request()
                .input("user_id", id)
                .execute("uspGetProjectByUserId", (error, records) => {
                    if (error) {
                        return res.json(error)
                    }
                    else {
                        if (records.recordset.length == 0)
                            return res.status(404).json({ "message": "not projects" })

                        return res.status(200).json({ "data": records.recordset })


                    }
                })
        }
        else {
            return res.status(500).json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
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
        const { users_id, project_id } = req.body
        // const users_id = users_id_str.slice(1, -1).split(",");
        // console.log(Array.isArray(users_id));
        // console.log(users_id);

        const pool = await mssql.connect(sqlConfig)

        if (pool.connected) {
            for (let user_id of users_id) {
                // console.log(user_id);
                await pool.request()
                    .input("project_id", project_id)
                    .input("user_id", user_id)
                    .execute("uspSetProjectUser", (error, records) => {
                        if (error) {
                            console.log(error.message);
                            res.json({ error: error.message })
                        }
                        else {
                            // console.log(records.recordset);
                            res.json({ "data": records.recordset })
                        }
                    })
            }

        }
        else {
            res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message })
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
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            await pool.request().input("id", id).execute('uspDeleteProject', (error, record) => {
                if (error)
                    return res.status(500).json({ error: error.message })
                else {
                    console.log(record.recordset);
                    return res.status(202).json({ "message": "item deleted successifuly" })
                }
            })
        }
        else {
            return res.status(500).json({ error: "Error connecting to db" })
        }
        // const resp = await DB.exec('uspDeleteProject', { id })
        // console.log("d", resp);
        // if (resp.rowsAffected[0] == 0) {
        //     return res.status(200).json(
        //         {
        //             status: "success",
        //             message: "Project Deleted Successfully"
        //         }
        //     )

        // }

        // return res.status(401).json(
        //     {
        //         status: "error",
        //         message: "Project Not Deleted"
        //     }
        // )

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
                        // console.log(records.recordset);
                        res.json({ "data": records.recordset })
                    }
                })
        }
        else {
            res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
        res.json({ error: error.message })
    }
}

export const getUsersForProject = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            pool.request()
                .execute("uspGetUsersForProject", (error, records) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error })
                    }
                    else {
                        // console.log(records.recordset);
                        return res.status(200).json({ "users": records.recordset })
                    }
                })
        }
        else {
            return res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
        return res.json({ error: error.message })
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
        const { id } = req.info
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            pool.request()
                .input("user_id", id)
                .execute("uspGetUserProjectHistory", (error, records) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: error.message })
                    }
                    else {
                        console.log(records);
                        return res.status(200).json({ "data": records.recordset })
                    }
                })
        }
        else {
            return res.json({ Error: "error connecting to db" })
        }

    } catch (error) {
        console.log(error);
        return res.json({ error: error.message })
    }
}


export const getUsersForAproject = async (req, res) => {

    try {
        const id = req.params.id;
        const resp = await DB.exec('uspGetUsersAssignedToAProject', { id })
        console.log(resp)
        if (resp.recordset.length == 0) {
            return res.status(404).json(
                {
                    status: "error",
                    message: "No Users Assigned Currently"
                }
            )

        }
        else {
            return res.status(200).json(
                {
                    status: "success",
                    users: resp.recordset
                }
            )

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                status: "error",
                message: "Error fetching users"
            }
        )



    }



}

export const markProjectCompleted = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await mssql.connect(sqlConfig)
        if (pool.connected) {
            const request = await pool.request()
            const resp = await request.input("project_id", id).execute("uspMarkProjectCompleted")
            if (resp.rowsAffected[0] == 1) {
                res.status(202).json({ "message": "Updated successifuly" })
            }
            else {
                res.status(500).json({ 'error': "unable to complete the operation" })
            }
        }
        else {
            res.status(500).json({ error: error.message })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}