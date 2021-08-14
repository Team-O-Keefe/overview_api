const router = require('express').Router();
const controller = require('./overview');

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getStyles);
router.get('/products/:product_id/styles');

module.exports = router;
