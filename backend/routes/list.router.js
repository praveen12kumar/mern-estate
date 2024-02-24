import express from 'express';
import { isAuthenticatedUser} from '../middlerwares/auth.js';
import { createList, getUserListing, 
        deleteUserListing, 
        updateUserListing, 
        getListing, 
        getUserFromListing, 
        getSearchedListing } from '../controllers/list.controller.js';

const router = express.Router();

router.post("/create", isAuthenticatedUser, createList);
router.get("/list",getSearchedListing);
;
router.delete("/:id", isAuthenticatedUser, deleteUserListing);
router.put("/update/:id", isAuthenticatedUser, updateUserListing);
router.get("/user-details/:id", isAuthenticatedUser, getUserFromListing);
router.get("/user/:id", isAuthenticatedUser, getUserListing)
router.get("/list/:id", getListing);


export default router;