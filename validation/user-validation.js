const { body } = require('express-validator');

const createUserValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email.'),
    body('age').notEmpty().withMessage('Age is required').isNumeric().withMessage('Must be a number.').toInt(),
    body('role').notEmpty().withMessage('Role is required')
];

module.exports = {createUserValidator};
