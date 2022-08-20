DROP TABLE IF EXISTS liked_locations CASCADE;
CREATE TABLE liked_locations (
  location_id INTEGER REFERENCES locations(location_id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);
