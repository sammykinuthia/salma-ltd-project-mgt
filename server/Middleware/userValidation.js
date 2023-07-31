import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const validateUser = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(401).json({ "message": "No token provided" })
        }

        const decordedData = jwt.verify(token, process.env.SECRET)
        req.info = decordedData
        console.log(decordedData);
        
    } 
    catch (error) {
        console.log(error);
        return res.json(error)
    }


    next()
}