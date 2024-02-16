import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";


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


export {
    register
}