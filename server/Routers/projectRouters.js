import { Router } from "express";
import { getProjects, createProject,getProject,getUserProject,getUserProjectsHistory, deleteProject, assignProject, getAssignedProject,getUsersForAproject, getProjectByUserId, getUsersForProject, markProjectCompleted} from "../Controllers/projectControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const projectRouter = Router()

projectRouter.get('/',validateUser,getProjects)
projectRouter.post('/',validateUser,createProject)
projectRouter.get('/:id',validateUser,getProject)

// projectRouter.get('/:id',validateUser,getProjectByUserId)
projectRouter.post('/projectUsers',validateUser,getUsersForProject)
projectRouter.post('/completed/:id',validateUser,markProjectCompleted)
projectRouter.get('/u/:id',validateUser,getProjectByUserId)
projectRouter.get('/user/',validateUser, getUserProject)
projectRouter.get('/user/hist/',validateUser, getUserProjectsHistory)
projectRouter.post('/assign', validateUser, assignProject)
projectRouter.post('/getAssigned', validateUser, getAssignedProject)
projectRouter.get('/:id/users',validateUser,getUsersForAproject)
projectRouter.delete('/:id',validateUser,deleteProject)
