const router = require('express').Router();
const controller = require('./overview');

router.get('/products', (req, res) => {
  let { page, count } = req.query;

  if (!page) {
    page = 1;
  }
  if (!count) {
    count = 5;
  }
  controller.getProducts(page, count, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  controller.getProductInfo(id, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});
router.get('/products/:product_id');

module.exports = router;
