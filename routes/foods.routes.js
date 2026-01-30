import express from 'express';
import controller from '../controllers/foods.controller.js';

import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware.js';

const upload = multer();

const router = express.Router();

router.post('/suggestion', authMiddleware, controller.suggestFood);

router.post('/scan-image', authMiddleware, upload.single("image"), controller.scanImage);

export default router;