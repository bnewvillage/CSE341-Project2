const express = require('express');
const router = express.Router();
const {createUserValidator} = require('../validation/user-validation');
const usersController = require('../controllers/users');
const {isAuthenticated} = require('../middleware/authenticate');


router.get('/', usersController.getAll);

router.post('/', isAuthenticated, createUserValidator, usersController.createUser);

router.put('/:id', isAuthenticated, createUserValidator, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;

