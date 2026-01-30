
import historyRepository from '../repository/history.repository.js';

const listHistory = async (userId) => {
    const history = await historyRepository.getAllHistoryWithUserID(userId);

    return history;
}

const list2WeekHistory = async (userId) => {
    const history = await historyRepository.get2WeekHistoryWithUserID(userId);

    return history;
}

const addHistory = async (userId, foodName, nutriements) => {
    const historyId = await historyRepository.createHistory({
        user_id: userId,
        food_name: foodName,
        ...nutriements
    });

    return historyId;
}

export default {
    listHistory,
    list2WeekHistory,
    addHistory
}