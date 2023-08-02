import { Router } from "express";
import { getProjects, createProject,getProject} from "../Controllers/projectControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const projectRouter = Router()

projectRouter.get('/',validateUser,getProjects)
projectRouter.post('/',validateUser,createProject)
projectRouter.get('/:id',validateUser,getProject)