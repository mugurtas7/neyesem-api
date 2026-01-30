const db = require('../config/db');

const getAllHistoryWithUserID = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM history WHERE user_id = ? ORDER BY create_date ASC',
        [userId]
    );
    return rows;
};

const get2WeekHistoryWithUserID = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM history WHERE user_id = ? ORDER BY create_date ASC LIMIT 14',
        [userId]
    );
    return rows;
};

const createHistory = async (history) => {
    const [result] = await db.query(
        'INSERT INTO history (user_id, food_name, calories_100g, protein_100g, carbs_100g, sugars_100g, calories, protein, carbs, sugars, nova) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [history.user_id, history.food_name, history.calories100g, history.protein100g, history.carbs100g,
            history.sugars100g, history.calories, history.protein, history.carbs, history.sugars, history.nova]
    );
    return result.insertId;
};

module.exports = {
    getAllHistoryWithUserID,
    get2WeekHistoryWithUserID,
    createHistory,
};
