import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

const isAuthenticatedUser = async(req, res, next)=>{
    try {
        const {access_token} = req.cookies;

        if(!access_token) {
            return next(errorHandler(401, "Please login to access this resource."));
        }

        const decodedData = jwt.verify(access_token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


export {isAuthenticatedUser};