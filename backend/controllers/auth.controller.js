import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";

const register = async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;

        let user = await User.findOne({email});

        if(user){
            return next(errorHandler(409, "user already registered"))
        }

        const hassedPassword = bcrypt.hashSync(password, 10);
        user = await User.create({username, email, password:hassedPassword});
      
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

const googleRegister = async (req, res, next) => {
    const {email, username, avatar} = req.body;
    
    try {
        let user = await User.findOne({email});

        if(user){
            sendToken(user, 200, res);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            user = await User.create({
                username: username.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar
            })

            sendToken(user, 200, res);
        }
    } catch (error) {
        next(error);
    }
}



export {
    register,
    login,
    googleRegister,
}