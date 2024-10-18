import { validationResult } from 'express-validator';

// Middleware para validar campos
export const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};


export default validateFields;
