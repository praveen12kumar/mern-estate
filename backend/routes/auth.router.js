import express from 'express';
import { 
    register,
    login,
    googleRegister

} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/google", googleRegister);

export default router;