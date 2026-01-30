import express from 'express';
import controller from '../controllers/history.controller.js';

const router = express.Router();

router.get('/', controller.getAllHistory);

export default router;