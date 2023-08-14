const express = require ('express');
const router = express.Router('router');
const orderController = require('../controllers/orderController');


router.get('/', orderController.orderList);
router.get('/searchByFilters', orderController.searchOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.orderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router