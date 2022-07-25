export function validateSchema(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            console.log(validation.error.message);
            return res.status(422).send({ error: validation.error.message });
        }
        next();
    };
}
