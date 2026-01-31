import express from 'express';
import controller from '../controllers/auth.controller.js';
import validateSchema from '../middlewares/schema.middleware.js';
import { loginSchema, registerSchema, registerFastSchema } from '../schemas/user.schemas.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), controller.loginUser);
router.post('/register', validateSchema(registerSchema), controller.registerUser);
router.post('/register-fast', validateSchema(registerFastSchema), controller.registerFast);

export default router;