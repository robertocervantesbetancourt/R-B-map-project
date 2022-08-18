DROP TABLE IF EXISTS locations CASCADE;
CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY NOT NULL,
  location_name VARCHAR(255) NOT NULL,
  location_image VARCHAR(255) NOT NULL,
  location_description TEXT,
  location_latitude FLOAT NOT NULL,
  location_longitude FLOAT NOT NULL,
  map_id INTEGER REFERENCES maps(map_id) ON DELETE CASCADE NOT NULL,
  creator_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE NOT NULL
);
