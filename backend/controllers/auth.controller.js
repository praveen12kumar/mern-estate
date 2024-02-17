import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";

const register = async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        const hassedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({username, email, password:hassedPassword});
      
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
        
    } catch (error) {
        // res.status(500).json({
        //     message: error.message
        // }) 
          next(error);
    }
};


const login = async(req, res, next) => {
    const {email, password} = req.body;
    try {

        if(!email || !password) {
            return next(errorHandler(404, "Invalid email or password"))
        }

       const user = await User.findOne({email}).select("+password");

       if(!user){
        return next(errorHandler(404, "User not found"))
       }

       const isMatch = await user.comparePassword(password);

       if(!isMatch){
        return next(errorHandler(401, "Invalid credentials"))
       }
      
       sendToken(user, 200, res)

       

    } catch (error) {
        next(error);
    }
}



export {
    register,
    login
}