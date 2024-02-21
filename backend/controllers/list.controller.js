import Listing from "../models/listing.model.js";
import {errorHandler} from "../utils/errorHandler.js";


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
                listing,
            })
        } catch (error) {
            next(error)
        }
    }



export {createList,
getUserListing,
deleteUserListing,
updateUserListing,
getListing

};