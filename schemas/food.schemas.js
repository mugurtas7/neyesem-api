import Joi from "joi";

export const addHistorySchema = Joi.object({
    food_name: Joi.string().required(),
    nutriements: Joi.object({
        calories100g: Joi.number().required(),
        protein100g: Joi.number().required(),
        carbs100g: Joi.number().required(),
        sugars100g: Joi.number().required(),
        calories: Joi.number().required(),
        protein: Joi.number().required(),
        carbs: Joi.number().required(),
        sugars: Joi.number().required(),
        nova: Joi.number().integer().required()
    })
});