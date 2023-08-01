import { Router } from "express";
import { getProjects, createProject} from "../Controllers/projectControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const projectRouter = Router()

projectRouter.get('/',validateUser,getProjects)
projectRouter.post('/',validateUser,createProject)