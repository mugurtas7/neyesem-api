const db = require('../config/db');

const getUserWithEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows;
};

const registerUser = async (history) => {
    const [result] = await db.query(
        'INSERT INTO history (user_id, food_name, calories_100g, protein_100g, carbs_100g, sugars_100g, calories, protein, carbs, sugars, nova) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [history.user_id, history.food_name, history.calories100g, history.protein100g, history.carbs100g,
            history.sugars100g, history.calories, history.protein, history.carbs, history.sugars, history.nova]
    );
    return result.insertId;
};

module.exports = {
    getUserWithEmail,
};
