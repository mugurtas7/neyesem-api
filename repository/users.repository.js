import db from '../config/db.js';

const getUserWithEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    );

    return rows[0] || null;
};

const registerUser = async (user) => {
    const [result] = await db.query(
        'INSERT INTO users (name, surname, email, password, height, weight, bmi_value, what_want) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [user.name, user.surname, user.email, user.password, user.height, user.weight, user.bmi_value, user.what_want]
    );
    return result.insertId;
};

export default {
    getUserWithEmail,
    registerUser
}