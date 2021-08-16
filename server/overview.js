const { Pool } = require('pg');
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

module.exports.getProductInfo = async (pId, cb) => {
  // const query = `SELECT
  //                 json_build_object(
  //                   'style_id', styles.style_id,
  //                   'product_id', styles.product_id,
  //                   'name', styles.name,
  //                   'sale_price', styles.sale_price,
  //                   'original_price', styles.original_price,
  //                   'default?', styles.default_style,
  //                   'photos', json_agg(
  //                          json_build_object(
  //                            'url', photos.url, 'thumbnail_url', photos.thumbnail_url
  //                          )
  //                        ),
  //                 ) AS results
  //                   FROM products, styles, photos
  //                   WHERE products.product_id = 10
  //                   AND products.product_id = styles.product_id
  //                   AND styles.style_id = photos.style_id
  //                   AND styles.style_id = skus.style_id
  //                   GROUP BY styles.style_id;`;

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
      console.log(response.rows[0]);
      cb(null, response.rows[0]);
    })
    .catch((error) => {
      console.error(`ERROR ::: ${error}`);
    });
  // await pool.connect()
  //   .then((client) => {
  //     client.query(query2, pId)
  //       .then((response) => {
  //         client.release();
  //       })
  //       .catch((error) => {
  //         client.release();
  //         console.error(`ERROR ::: ${error}`);
  //       });
  //   })
  //   .catch((error) => {
  //     console.error(`ERROR ::: ${error}`);
  //   });
};
