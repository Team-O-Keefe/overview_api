const { Pool } = require('pg');
const DBCONFIG = require('./.db-config');

const pool = new Pool(DBCONFIG.db);

module.exports.getProducts = (req, res) => {
  const query = 'SELECT product_id, name, slogan, description, category, default_price FROM products WHERE product_id < 10';
  pool.connect()
    .then((client) => {
      client.query(query)
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

module.exports.getStyles = (req, res) => {
  const values = [
    req.query.id
  ];
  const query = `SELECT json_agg(styles)
                  FROM (
                    SELECT * FROM styles WHERE styles.product_id < $1
                  ) as styles
                  LEFT JOIN photos ON styles.style_id=photos.style_id
                  LEFT JOIN skus ON styles.style_id=skus.style_id
                  `;

  pool.connect()
    .then((client) => {
      client.query(query, values)
        .then((response) => {
          client.end();
          res.send(response.rows);
        })
        .catch((error) => {
          client.end();
          res.status(error);
          res.end();
        });
    })
    .catch((error) => {
      res.status(error);
      res.end();
    });
};
