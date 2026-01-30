import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

async function suggestFood(history, what_want) {
    const contents = [
        {
            text: `
            Aşağıdaki kullanıcı geçmişini dikkate al:
            ${JSON.stringify(history)}

            Kullanıcı şu an ${what_want} istiyor.
            Türklerin ofiste yiyebileceği, online sipariş edilebilir bir yemek öner. Sadece ismini ver.
            `
        },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                required: ["food_name"],
                properties: {
                    food_name: {
                        type: Type.STRING,
                    }
                },
            },
        }
    });

    return (JSON.parse(response.text)).food_name;
}

async function getFoodDataFromName(foodName) {
    const contents = [
        {
            text: `${foodName} yemeğinin besin bilgilerini ver. Eğer bilgi yoksa tahmini bir değer ver.`
        },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                required: ["nutriements"],
                properties: {
                    nutriements: {
                        type: Type.OBJECT,
                        required: ["calories_100g", "protein_100g", "carbs_100g", "sugars_100g", "calories", "protein", "carbs", "sugars", "nova"],
                        properties: {
                            calories_100g: {
                                type: Type.NUMBER,
                            },
                            protein_100g: {
                                type: Type.NUMBER,
                            },
                            carbs_100g: {
                                type: Type.NUMBER,
                            },
                            sugars_100g: {
                                type: Type.NUMBER,
                            },
                            calories: {
                                type: Type.NUMBER,
                            },
                            protein: {
                                type: Type.NUMBER,
                            },
                            carbs: {
                                type: Type.NUMBER,
                            },
                            sugars: {
                                type: Type.NUMBER,
                            },
                            nova: {
                                type: Type.INTEGER,
                            },
                        },
                    },
                },
            },
        }
    });

    return (JSON.parse(response.text)).nutriements;
}

async function getFoodDataFromImage(image) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: image,
            },
        },
        {
            text: `Bu görseldeki yemeği analiz et. Besin bilgilerini ver. Eğer bilgi yoksa tahmini bir değer ver.`
        },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                required: ["food_name", "nutriements"],
                properties: {
                    food_name: {
                        type: Type.STRING,
                    },
                    nutriements: {
                        type: Type.OBJECT,
                        required: ["calories100g", "protein100g", "carbs100g", "sugars100g", "calories", "protein", "carbs", "sugars", "nova"],
                        properties: {
                            calories100g: {
                                type: Type.NUMBER,
                            },
                            protein100g: {
                                type: Type.NUMBER,
                            },
                            carbs100g: {
                                type: Type.NUMBER,
                            },
                            sugars100g: {
                                type: Type.NUMBER,
                            },
                            calories: {
                                type: Type.NUMBER,
                            },
                            protein: {
                                type: Type.NUMBER,
                            },
                            carbs: {
                                type: Type.NUMBER,
                            },
                            sugars: {
                                type: Type.NUMBER,
                            },
                            nova: {
                                type: Type.INTEGER,
                            },
                        },
                    },
                },
            },
        }
    });

    return JSON.parse(response.text);
}

export default {
    suggestFood,
    getFoodDataFromName,
    getFoodDataFromImage
}