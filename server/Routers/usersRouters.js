import { Router } from "express";
import { createUser, loginUser, getUsers, getUser,checkUser,verifyEmail} from "../Controllers/usersControllers.js";
import { validateUser } from "../Middleware/userValidation.js";


export const usersRouter = Router()

usersRouter.post('/register',createUser)
usersRouter.post('/login',loginUser)
usersRouter.get('/',validateUser,getUsers)
usersRouter.get('/:id',getUser)
usersRouter.post('/check',validateUser,checkUser)
usersRouter.post('/verify',validateUser, verifyEmail)

// usersRouter.post('/verify', verifyVerificationToken)


