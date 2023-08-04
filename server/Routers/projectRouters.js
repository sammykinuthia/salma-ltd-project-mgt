import { Router } from "express";
import { getProjects, createProject, getProject, assignProject, getAssignedProject } from "../Controllers/projectControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const projectRouter = Router()

projectRouter.get('/', validateUser, getProjects)
projectRouter.post('/', validateUser, createProject)
projectRouter.get('/:id', validateUser, getProject)
projectRouter.post('/assign', validateUser, assignProject)
projectRouter.post('/getAssigned', validateUser, getAssignedProject)