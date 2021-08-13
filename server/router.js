const router = require('express').Router();

router.get('/product');
router.get('/products/:product_id');
router.get('/products/:product_id/styles');

module.exports = router;