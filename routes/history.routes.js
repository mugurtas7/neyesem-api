import express from 'express';
import controller from '../controllers/history.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateSchema from '../middlewares/schema.middleware.js';
import { addHistorySchema } from '../schemas/food.schemas.js';

const router = express.Router();

router.get('/', authMiddleware, controller.getAllHistory);
router.get('/week2', authMiddleware, controller.get2WeekHistory);
router.post('/', authMiddleware, validateSchema(addHistorySchema), controller.addHistory);

export default router;