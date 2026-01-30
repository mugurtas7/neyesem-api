import express from 'express';
import controller from '../controllers/users.controller.js';

const router = express.Router();

router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);

export default router;