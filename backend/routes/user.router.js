import express from 'express';
import { deleteUser, logout, updateUserProfile } from '../controllers/auth.controller.js';
import { isAuthenticatedUser } from '../middlerwares/auth.js';

const router = express.Router();
router.put("/update/:id", isAuthenticatedUser, updateUserProfile);
router.delete("/delete/:id", isAuthenticatedUser, deleteUser);
router.get('/logout', isAuthenticatedUser, logout)


export default router;