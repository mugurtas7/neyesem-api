const validateSchema = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,   // tüm hataları göster
            stripUnknown: true, // fazla alanları sil
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(d => ({
                    field: d.path.join('.'),
                    message: d.message,
                })),
            });
        }

        req[property] = value; // temiz data
        next();
    };
};

export default validateSchema;