import db from '../config/db.js';

const getAllFoods = async () => {
    const [rows] = await db.query(
        'SELECT * FROM foods'
    );
    return rows;
};

const searchFoodByName = async (foodName) => {
    const [rows] = await db.query(
        'SELECT * FROM foods WHERE food_name LIKE ?',
        [`%${foodName}%`]
    );
    return rows[0] || null;
}

const insertFood = async (food) => {
    const [result] = await db.query(
        'INSERT INTO foods (food_name, calories_100g, protein_100g, carbs_100g, sugars_100g, calories, protein, carbs, sugars, nova) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [food.food_name, food.nutriements.calories_100g, food.nutriements.protein_100g, food.nutriements.carbs_100g,
            food.nutriements.sugars_100g, food.nutriements.calories, food.nutriements.protein, food.nutriements.carbs,
            food.nutriements.sugars, food.nutriements.nova]
    );

    return result.insertId;
}

export default {
    getAllFoods,
    searchFoodByName,
    insertFood
}