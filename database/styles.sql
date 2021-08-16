DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles(
  style_id SERIAL NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);
COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/styles.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;
CREATE INDEX style_idx ON styles (style_id);
CREATE INDEX product_idx ON styles (product_id);