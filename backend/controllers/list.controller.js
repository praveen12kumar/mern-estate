import Listing from "../models/listing.model.js";
import {errorHandler} from "../utils/errorHandler.js";
import User from "../models/user.model.js";

const createList = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);

        res.status(201).json({
            listing,
        })

    } catch (error) {
        next(error);
    }
};

const getUserListing  = async(req, res, next) => {
    if(req.user.id === req.params.id){
        try {
            const listing = await Listing.find({userRef: req.user.id})
            res.status(200).json({
                listing,
            })
        } catch (error) {
            next(error);
        }
    }
    else{
        res.status(401).json({
            message:"Only You can seen your listings"
        })
    }
}

const deleteUserListing = async(req, res, next) => {
        try {
            let listing = await Listing.findById(req.params.id);
            
            if(!listing){
                return res.status(404).json({
                    message:"Listing not found"
                })
            }

            listing = await Listing.findByIdAndDelete(req.params.id);
            
            res.status(200).json({
                listing,
                message: "Listing deleted successfully"
            })
        } catch (error) {
            next(error);
        }
    }

    const updateUserListing = async(req, res, next) => {
       try {
        const listing = await Listing.findById(req.params.id);
        
        if(!listing){
            return res.status(404).json({
                message:"Listing not found"
            });
        }
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true})
        
        res.status(200).json({
            message: "Listing updated successfully",
            listing: updatedListing
        })
       } catch (error) {
        next(error)
       } 
    }
   
    const getListing = async (req, res, next) => {
        try {
            const listing = await Listing.findById(req.params.id);
            if(!listing){
                res.status(404).json({
                    message:"Listing not found"
                })
            }
            res.status(200).json({
                success:true,
                listing,
            })
        } catch (error) {
            next(error)
        }
    }

    const getUserFromListing = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if(!user){
                return next(errorHandler(404, "user not found"));
            }
            res.status(200).json({
                _id:user._id,
                username:user.username,
                email:user.email,
                avatar:user.avatar,
            })
        } catch (error) {
            next(error);
        }
    }


    const getSearchedListing = async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 9;
            const startIndex = parseInt(req.query.startIndex) || 0;
            let offer = req.query.offer;
        
            if (offer === undefined || offer === 'false') {
              offer = { $in: [false, true] };
            }
        
            let furnished = req.query.furnished;
        
            if (furnished === undefined || furnished === 'false') {
              furnished = { $in: [false, true] };
            }
        
            let parking = req.query.parking;
        
            if (parking === undefined || parking === 'false') {
              parking = { $in: [false, true] };
            }
        
            let type = req.query.type;
        
            if (type === undefined || type === 'all') {
              type = { $in: ['sale', 'rent'] };
            }
        
            const searchTerm = req.query.searchTerm || '';
        
            const sort = req.query.sort || 'createdAt';
        
            const order = req.query.order || 'desc';
        
            const listings = await Listing.find({
              name: { $regex: searchTerm, $options: 'i' },
              offer,
              furnished,
              parking,
              type,
            })
              .sort({ [sort]: order })
              .limit(limit)
              .skip(startIndex);
                
              
              return res.status(200).json({
                listings
              })

        } catch (error) {
            next(error);
        }
    }



export {createList,
getUserListing,
deleteUserListing,
updateUserListing,
getListing,
getUserFromListing,
getSearchedListing,

};