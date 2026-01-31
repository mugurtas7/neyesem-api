import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import usersRepository from '../repository/users.repository.js';
import { calculateBMI } from '../utils/utils.js';
import AppError from '../errors/AppError.js';

const login = async (email, password) => {
    const user = await usersRepository.getUserWithEmail(email);
    if (!user) throw new AppError('Kullanıcı bulunamadı!', 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Şifrenizi yanlış girdiniz!', 400);

    const token = jwt.sign(
        { id: user.id, height: user.height, weight: user.weight, bmi_value: user.bmi_value, what_want: user.what_want },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    return token;
};

const register = async (name, surname, email, password, height, weight, what_want) => {
    const findEmail = await usersRepository.getUserWithEmail(email);

    if (findEmail) throw new AppError("Bu email adresi zaten kullanılıyor!", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await usersRepository.registerUser({
        name,
        surname,
        email,
        password: hashedPassword,
        height,
        weight,
        bmi_value: calculateBMI(height, weight),
        what_want
    });

    return userId;
}

const registerFast = async (name, surname, email, password) => {
    const findEmail = await usersRepository.getUserWithEmail(email);

    if (findEmail) throw new AppError("Bu email adresi zaten kullanılıyor!", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await usersRepository.registerUser({
        name,
        surname,
        email,
        password: hashedPassword,
        height: 0,
        weight: 0,
        bmi_value: 0,
        what_want: 0
    });

    return userId;
}

export default {
    login,
    register,
    registerFast
};