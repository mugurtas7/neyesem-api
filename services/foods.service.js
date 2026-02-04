import AppError from '../errors/AppError.js';
import foodsRepository from '../repository/foods.repository.js';
import { whatWantNormalize } from '../utils/utils.js';
import aiService from './ai.service.js';
import historyService from './history.service.js';

const getFoodSuggestion = async (userId, whatWant) => {
    const history = await historyService.list2WeekHistory(userId);

    const foodName = await aiService.suggestFood(history, whatWantNormalize(whatWant));

    if (!foodName) throw new AppError("Yemek önerisi getirilemedi!", 400);

    const foodData = await foodsRepository.searchFoodByName(foodName);

    if (!foodData) {
        const aiFoodData = await aiService.getFoodDataFromName(foodName);

        const foodId = await foodsRepository.insertFood({
            food_name: foodName,
            nutriements: aiFoodData
        });

        return {
            id: foodId,
            // https://api.unsplash.com/search/photos?query=Izgara%20Tavuklu%20Salata&client_id=&page=1
            food_name: foodName,
            nutriements: aiFoodData
        };
    }

    return foodData;
}

const scanImage = async (image) => {
    const foodData = await aiService.getFoodDataFromImage(image);

    if (!foodData) throw new AppError("Besin bilgileri getirilemedi!", 400);

    return foodData;
}

export default {
    getFoodSuggestion,
    scanImage
}