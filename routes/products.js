const express = require('express');
const router = express.Router();
const {createProductValidator} = require('../validation/product-validation');
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/',isAuthenticated, productsController.getAll);

router.post('/',isAuthenticated, createProductValidator, productsController.createProduct);

router.put('/:id', isAuthenticated, createProductValidator, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);


module.exports = router;