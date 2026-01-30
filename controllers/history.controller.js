import service from '../services/history.service.js';

export const getAllHistory = async (req, res, next) => {
    try {
        const history = await service.listHistory(req.user.id);

        return res.status(200).send({ message: "Geçmiş başarıyla getirildi!", history });
    } catch (err) {
        next(err);
    }
}

export const get2WeekHistory = async (req, res, next) => {
    try {
        const history = await service.list2WeekHistory(req.user.id);

        return res.status(200).send({ message: "2 haftalık geçmiş başarıyla getirildi!", history });
    } catch (err) {
        next(err);
    }
}

export const addHistory = async (req, res, next) => {
    try {
        const { food_name, nutriements } = req.body;

        const historyId = await service.addHistory(req.user.id, food_name, nutriements);

        return res.status(200).send({ message: "Başarıyla eklendi!", historyId });
    } catch (err) {
        next(err);
    }
}

export default {
    getAllHistory,
    get2WeekHistory,
    addHistory
}