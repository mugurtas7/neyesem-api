import authService from "../services/auth.service.js";

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const data = await authService.login(email, password);

        return res.status(200).send({ message: "Başarıyla giriş yaptınız!", data });
    } catch (err) {
        next(err);
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, height, weight, what_want } = req.body;

        const insertId = await authService.register(name, surname, email, password, height, weight, what_want);

        return res.status(201).send({ message: "Başarıyla kayıt oldunuz!", insertId });
    } catch (err) {
        next(err);
    }
}

const registerFast = async (req, res, next) => {
    try {
        const { name, surname, email, password } = req.body;

        const insertId = await authService.registerFast(name, surname, email, password);

        return res.status(201).send({ message: "Başarıyla kayıt oldunuz!", insertId });
    } catch (err) {
        next(err);
    }
}

const userMe = async (req, res, next) => {
    try {
        return res.status(201).send({ user: req.user });
    } catch (err) {
        next(err);
    }
}

const updateInfo = async (req, res, next) => {
    try {
        const { height, weight, what_want } = req.body;

        await authService.updateInfo(req.user.id, height, weight, what_want);

        return res.status(201).send({ message: "Bilgileriniz başarıyla kaydedildi!", data: { height, weight, what_want } });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export default {
    loginUser,
    registerUser,
    registerFast,
    userMe,
    updateInfo
}