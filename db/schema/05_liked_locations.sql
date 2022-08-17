DROP TABLE IF EXISTS liked_locations CASCADE;
CREATE TABLE liked_locations (
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
