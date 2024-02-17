import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        selected:false,
    }
},{
    timestamps: true,
})


userSchema.methods.comparePassword = async function(enteredPassword){
    return await  bcryptjs.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    } )
}



const User = mongoose.model('User',userSchema);

export default User;