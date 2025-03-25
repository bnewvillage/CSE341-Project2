const express = require('express');
const router = express.Router();
const {createProductValidator} = require('../validation/product-validation');
const productsController = require('../controllers/products');


router.get('/', productsController.getAll);

router.post('/', createProductValidator, productsController.createProduct);

router.put('/:id', createProductValidator, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;