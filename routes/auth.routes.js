import express from 'express';
import controller from '../controllers/auth.controller.js';
import validateSchema from '../middlewares/schema.middleware.js';
import { loginSchema, registerSchema, registerFastSchema, infoSchema } from '../schemas/user.schemas.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), controller.loginUser);
router.post('/register', validateSchema(registerSchema), controller.registerUser);
router.post('/register-fast', validateSchema(registerFastSchema), controller.registerFast);

router.get('/me', authMiddleware, controller.userMe);
router.put('/info', authMiddleware, validateSchema(infoSchema), controller.updateInfo);

export default router;