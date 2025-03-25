const { body, param } = require('express-validator');

const createProductValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number').toInt(),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').notEmpty().withMessage('Stock is required').isNumeric().withMessage('Stock must be a number').toInt()
];

module.exports = {createProductValidator};
