import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import AuthRoutes from './routes/auth.routes.js';
import FoodRoutes from './routes/foods.routes.js';
import HistoryRoutes from './routes/history.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRoutes);
app.use('/foods', FoodRoutes);
app.use('/history', HistoryRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log("API is online on " + port + " port.");
})