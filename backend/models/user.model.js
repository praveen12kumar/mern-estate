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
    },
    avatar:{
        type: String,
        default:"https://imgs.search.brave.com/UfByHaUWn4fefCd8wp5-WiFM1xqB_Vtkt6NdKl2XKuY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzgzLzkwLzk1/LzM2MF9GXzQ4Mzkw/OTU2OV9PSTRMS05l/RmdId3Z2Vmp1NjBm/ZWpMZDlnajQzZElj/ZC5qcGc"
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