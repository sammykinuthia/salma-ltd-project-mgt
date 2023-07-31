import { Router } from "express";
import { getProjects } from "../Controllers/projectControllers.js";


export const projectRouter = Router()

projectRouter.get('/',getProjects)