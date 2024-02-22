import express from 'express';
import { isAuthenticatedUser} from '../middlerwares/auth.js';
import { createList, getUserListing, deleteUserListing, updateUserListing, getListing, getUserFromListing } from '../controllers/list.controller.js';

const router = express.Router();

router.post("/create", isAuthenticatedUser, createList);
router.get("/user/:id", isAuthenticatedUser, getUserListing);
router.delete("/:id", isAuthenticatedUser, deleteUserListing);
router.put("/update/:id", isAuthenticatedUser, updateUserListing);
router.get("/list/:id", getListing);
router.get("/user-details/:id", isAuthenticatedUser, getUserFromListing);



export default router;