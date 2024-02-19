import express from 'express';
import { updateUserProfile } from '../controllers/auth.controller.js';
import { isAuthenticatedUser } from '../middlerwares/auth.js';

const router = express.Router();
router.put("/user/update/:id", isAuthenticatedUser, updateUserProfile);

export default router;