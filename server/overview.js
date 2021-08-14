const { Pool } = require('pg');
const DBCONFIG = require('./.db-config');

const pool = new Pool(DBCONFIG.db);

module.exports.getProducts = (req, res) => {
  const query = 'SELECT product_id, name, slogan, description, category, default_price FROM products WHERE product_id < 10';
  pool.connect()
    .then((client) => {
      client.query(query)
        .then((response) => {
          console.log(response.rows);
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
