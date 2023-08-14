const express = require ('express');
const router = express.Router('router');
const productController = require('../controllers/productControllers');

router.get('/', productController.productList);
router.get('/:id', productController.productById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;