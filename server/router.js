const router = require('express').Router();
const controller = require('./overview');

router.get('/products', controller.getProducts);

router.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  controller.getProductInfo(id, (error, data) => {
    if (error) {
      res.status();
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
router.get('/products/:product_id');

module.exports = router;
