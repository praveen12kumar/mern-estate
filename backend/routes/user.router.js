import express from 'express';
import { mockApi } from '../controllers/user.controller.js';


const router = express.Router();
router.get("/users", mockApi);

export default router;