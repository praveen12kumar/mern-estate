import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";

const register = async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message: "Enter username or email or password",
            })
        }
        let user = await User.findOne({
            $or:[{username}, {email}]
        });

        if(user){
            return next(errorHandler(409, "User with email or username already exists"))
        }

        const hassedPassword = bcryptjs.hashSync(password, 10);
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
};


// update user profile
// before updating the user profile we need to verify the user is genuine or not
// so we to create a middleware

const updateUserProfile = async(req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You can only update you own account"));
        }

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new:true})

        res.status(200).json({
            message:"User profile updated successfully",
            user:{
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar
            }
        })

    } catch (error) {
        next(error)
    }
};


const deleteUser = async (req, res, next)=>{
    try {
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You can only delete your own account"))
        }

        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({
            message:"User deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next)=>{
    try {
        res.clearCookie("access_token");
        res.status(200).json({
            message:"User logged out successfully",
        });
    } catch (error) {
        next(error);
    }
}


export {
    register,
    login,
    googleRegister,
    updateUserProfile,
    deleteUser,
    logout,

}