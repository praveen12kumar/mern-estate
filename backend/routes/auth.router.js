import express from 'express';
import { 
    register,
    login,
    googleRegister,

} from "../controllers/auth.controller.js";



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleRegister);



export default router;