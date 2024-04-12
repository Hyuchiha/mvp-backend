const express = require('express');
const validate = require('../../middlewares/validate');
const productsValidation = require('../../validations/products.validation');
const { productsController } = require('../../controllers');

const router = express.Router();

router.get('/', validate(productsValidation.getProducts), productsController.getProducts);
router.post('/', validate(productsValidation.createProduct), productsController.createProduct);
router.get('/:productId', validate(productsValidation.getProduct), productsController.getProduct);
router.put('/:productId', validate(productsValidation.updateProduct), productsController.updateProduct);
router.delete('/:productId', validate(productsValidation.getProduct), productsController.deleteProduct);

router.post('/import', productsController.importProducts);

module.exports = router;
