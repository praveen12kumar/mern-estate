import express from 'express';
import { isAuthenticatedUser} from '../middlerwares/auth.js';
import { createList, getUserListing, deleteUserListing } from '../controllers/list.controller.js';

const router = express.Router();

router.post("/create", isAuthenticatedUser, createList);
router.get("/:id", isAuthenticatedUser, getUserListing);
router.delete("/:id", isAuthenticatedUser, deleteUserListing);

export default router;