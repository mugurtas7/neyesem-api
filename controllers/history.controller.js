export const getAllHistory = async () => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Fotoğrafı seçmelisiniz!" });
        }

        const base64 = file.buffer.toString("base64");

        const data = await getFoodDataFromImage(base64);

        return res.status(200).send({ message: "Besin bilgileri başarıyla getirildi!", data: data });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Bilinmeyen bir hata oluştu!" });
    }
}