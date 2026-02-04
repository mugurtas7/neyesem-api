import jwt from 'jsonwebtoken';
import usersRepository from '../repository/users.repository.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token bulunamadı!' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await usersRepository.getUserWithId(decoded.id);
        
        if (!user) return res.status(401).json({ message: 'Geçersiz token' });

        req.user = user;
        next();
    } catch {
        return res.status(401).json({ message: 'Bilinmeyen token' });
    }
};

export default authMiddleware;