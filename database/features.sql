DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features(
  feature_id SERIAL NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(100),
  PRIMARY KEY (feature_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
COPY features(feature_id, product_id, feature, value)
FROM '/Users/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/features.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON features (product_id);