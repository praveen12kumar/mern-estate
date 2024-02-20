import express from 'express';
import { isAuthenticatedUser} from '../middlerwares/auth.js';
import { createList, getUserListing } from '../controllers/list.controller.js';

const router = express.Router();

router.post("/create", isAuthenticatedUser, createList);
router.get("/:id", isAuthenticatedUser, getUserListing);

export default router;