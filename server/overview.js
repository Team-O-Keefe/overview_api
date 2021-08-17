const { Pool } = require('pg');
const DBCONFIG = require('./.db-config');

const pool = new Pool(DBCONFIG.db);

module.exports.getProducts = async (page, count, cb) => {
  const query = `SELECT *
                  FROM products
                  WHERE product_id BETWEEN ${page} AND ${count * page}`;
  await pool.query(query)
    .then((response) => {
      cb(null, response.rows);
    })
    .catch((error) => {
      cb(error, null);
    });
};

module.exports.getProductInfo = async (pId, cb) => {
  const query2 = `SELECT
                    product_id, json_agg(json_build_object(
                      'style_id', style_id,
                      'name', name,
                      'original_price', original_price,
                      'sale_price', sale_price,
                      'default?', default_style,
                      'photos',
                      (SELECT json_agg(json_build_object(
                          'thumbnail_url', thumbnail_url,
                          'url', url
                        )) FROM photos WHERE style_id = styles.style_id),
                    'skus',
                      (SELECT
                          json_object_agg(sku_id,
                              json_build_object(
                            'size', size,
                            'quantity', quantity
                              )
                          ) as skus
                        FROM skus
                        WHERE style_id = styles.style_id
                            GROUP by style_id)
                    )) as results FROM styles
                        WHERE styles.product_id = ${pId}
                          GROUP BY product_id`;

  pool.query(query2)
    .then((response) => {
      cb(null, response.rows[0]);
    })
    .catch((error) => {
      cb(error, null);
    });
};
