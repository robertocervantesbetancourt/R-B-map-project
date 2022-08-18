const userById = (db, id) => {
  return db.query(
    `SELECT user_name, profile_photo, map_name, maps.map_id, location_id, location_name,
    location_image, location_description, location_latitude, location_longitude
    FROM users JOIN maps ON users.user_id = maps.creator_id
    JOIN locations ON users.user_id = locations.creator_id
    WHERE users.user_id = $1;`, [id]);
};

const mapsFromOtherUsers = (db, id) => {
  return db.query(
    `SELECT maps.* FROM maps
    WHERE NOT creator_id = $1;`, [id]);
};

const allLocationsInMap = (db, id) => {
  return db.query(
    `SELECT locations.* FROM locations
    WHERE map_id = $1;`, [id]);
};

module.exports = {userById, mapsFromOtherUsers, allLocationsInMap};
