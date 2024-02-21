import mongoose  from "mongoose";
const listSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    regularPrice:{
        required:true,
        type:Number,
    },
    discountedPrice:{
        type:Number,
        required:true,
    },
    bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },    
},{
    timestamps:true,
});


const Listing = mongoose.model('Listing', listSchema);

export default Listing;