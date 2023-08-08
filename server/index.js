import express from "express"
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { projectRouter } from "./Routers/projectRouters.js"
import { usersRouter } from "./Routers/usersRouters.js"

const app = express()
app.use(express.json())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
const PORT=3000
app.use('/',express.static(path.join(path.dirname("../frontend"),'frontend')))



app.use('/projects',projectRouter)
app.use('/users',usersRouter)

app.listen(PORT,()=>console.log(`Listening at http://localhost:${PORT}`))
