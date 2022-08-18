const userById = (db, id) => {
  return db.query(
    `SELECT users_name, profile_photo, map_name, maps.map_id, location_id, location_name,
    location_image, location_ description, location_latitude, location_longitude
    FROM users JOIN maps ON users.id = maps.creator_id
    JOIN locations ON users.id = locations.creator_id
    WHERE users.id = $1;`, [id]);
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
