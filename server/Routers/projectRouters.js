import { Router } from "express";
import { getProjects, createProject,getProject,getUserProject,getUserProjectsHistory, deleteProject} from "../Controllers/projectControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const projectRouter = Router()

projectRouter.get('/',validateUser,getProjects)
projectRouter.post('/',validateUser,createProject)
projectRouter.get('/:id',validateUser,getProject)
projectRouter.get('/user/',validateUser, getUserProject)
projectRouter.get('/user/hist/',validateUser, getUserProjectsHistory)

