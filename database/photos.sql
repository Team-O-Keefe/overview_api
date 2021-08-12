DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos(
  photo_id SERIAL NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  url TEXT,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);
COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/Users/erinoconnor/___HACK_REACTOR/SysDesCap/overview_api/database/csv-data/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON photos (style_id);