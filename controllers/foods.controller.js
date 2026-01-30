import service from '../services/foods.service.js';

const suggestFood = async (req, res, next) => {
    try {
        const foodData = await service.getFoodSuggestion(req.user.id, req.user.what_want);

        return res.status(200).send({ message: "Yemek önerisi başarıyla getirildi!", foodData });
    } catch (err) {
        next(err);
    }
}

const scanImage = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Fotoğrafı seçmelisiniz!" });
        }

        const base64 = file.buffer.toString("base64");

        const data = await service.scanImage(base64);

        return res.status(200).send({ message: "Besin bilgileri başarıyla getirildi!", data: data });
    } catch (err) {
        next(err);
    }
}

export default {
    suggestFood,
    scanImage
}