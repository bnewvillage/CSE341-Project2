const express = require('express');
const router = express.Router();
const {createUserValidator} = require('../validation/user-validation');
const usersController = require('../controllers/users');


router.get('/', usersController.getAll);

router.post('/', createUserValidator, usersController.createUser);

router.put('/:id', createUserValidator, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

