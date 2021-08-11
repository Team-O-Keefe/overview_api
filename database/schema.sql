CREATE SCHEMA IF NOT EXISTS overview;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS styles;

CREATE TABLE products(
  product_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(30),
  slogan VARCHAR(100),
  description VARCHAR(255),
  category VARCHAR(30),
  default_price INT
);
COPY products(product_id, name, slogan, description, category, default_price)
FROM '/User/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/product.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON products(product_id);


CREATE TABLE features(
  feature_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(100),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
COPY features(feature_id, product_id, feature, value)
FROM '/User/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/features.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON features(product_id);


CREATE TABLE photos(
  photo_id SERIAL NOT NULL PRIMARY KEY,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  url TEXT,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);
COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/User/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON photos(style_id);

CREATE TABLE skus(
  sku_id SERIAL NOT NULL PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(14),
  quantity INT,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);
COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/User/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON skus(style_id)

CREATE TABLE styles(
  style_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(100),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/User/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/styles.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX style_idx ON styles(style_id);
CREATE INDEX product_idx ON styles(product_id);

