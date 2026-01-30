const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRepo = require('../repositories/users.repository.js');

const login = async (email, password) => {
    const user = await usersRepo.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
};

module.exports = { login };
