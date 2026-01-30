import express from 'express';
import controller from '../controllers/foods.controller.js';

import multer from 'multer';

const upload = multer();

const router = express.Router();

router.get('/suggestion', async () => {
    
});

router.post('/scan-image', upload.single("image"), controller.scanImage);

export default router;