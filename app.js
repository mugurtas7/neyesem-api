import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import FoodRoutes from './routes/foods.routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/foods', FoodRoutes)

app.listen(port, () => {
    console.log("API is online on " + port + " port.");
})