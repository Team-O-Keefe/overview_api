CREATE SCHEMA IF NOT EXISTS sdc;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
  product_id SERIAL NOT NULL,
  name VARCHAR(30),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(30),
  default_price INT,
  PRIMARY KEY (product_id)
);
COPY products(product_id, name, slogan, description, category, default_price)
FROM '/Users/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/product.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON products (product_id);