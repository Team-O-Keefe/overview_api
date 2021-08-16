const { Pool } = require('pg');
const _ = require('underscore');
const DBCONFIG = require('./.db-config');

const pool = new Pool(DBCONFIG.db);

module.exports.getProducts = (req, res) => {
  const values = [
    req.query.page,
    req.query.count
  ];
  const query = `SELECT *
                  FROM products
                  WHERE product_id BETWEEN $1 AND $2`;
  pool.connect()
    .then((client) => {
      client.query(query, values)
        .then((response) => {
          console.log(response.rows.length);
          client.release();
          res.send(response.rows);
        })
        .catch((error) => {
          client.release();
          res.status(error);
          res.end();
        });
    })
    .catch((error) => {
      res.status(error);
      res.end();
    });
};

module.exports.getProductInfo = (req, res) => {
  const values = [
    req.query.id
  ];
  const query = `SELECT
                  json_build_object(
                    'style_id', styles.style_id,
                    'productId', styles.product_id,
                    'name', styles.name,
                    'sale_price', styles.sale_price,
                    'original_price', styles.original_price,
                    'default?', styles.default_style,
                    'photos', json_agg(json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url))
                    ) AS results
                    FROM products, styles, photos
                    WHERE products.product_id = 10
                    AND products.product_id = styles.product_id
                    AND styles.style_id = photos.style_id
                    GROUP BY styles.style_id;`;

  pool.connect()
    .then((client) => {
      client.query(query, values)
        .then((response) => {
          console.log('RESPONSE ::: ', response);
          client.release();
          res.send(response.rows);
        })
        .catch((error) => {
          client.release();
          res.status(error);
          res.end();
        });
    })
    .catch((error) => {
      res.status(error);
      res.end();
    });
};
