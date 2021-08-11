CREATE SCHEMA IF NOT EXISTS overview;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;

CREATE TABLE products(
  product_id NOT NULL PRIMARY KEY,
  name VARCHAR(30),
  slogan VARCHAR(100),
  description VARCHAR(255),
  category VARCHAR(30),
  default_price INT
);


COPY product(first_name, last_name, dob, email)
FROM 'C:\sampledb\persons.csv'
DELIMITER ','
CSV HEADER;