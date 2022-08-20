const userProfileById = (db, id) => {
  return db.query(
    `SELECT users.* FROM users
    WHERE users.user_id = $1;`, [id]);
    // `SELECT users.user_id as user_id, user_name, profile_photo, map_name, maps.map_id, location_id, location_name,
    // location_image, location_description, location_latitude, location_longitude
    // FROM users JOIN maps ON users.user_id = maps.creator_id
    // JOIN locations ON users.user_id = locations.creator_id
    // WHERE users.user_id = $1;`, [id]);
};

const userMaps = (db, id) => {
  return db.query(
    `SELECT maps.* FROM maps
    WHERE creator_id = $1;`, [id]);
}

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

const locationInfo = (db, id) => {
  return db.query(
    `SELECT locations.* FROM locations
    WHERE location_id = $1;`, [id]);
};

const newMap = (db, mapName, mapCreator) => {
  return db.query(
    `INSERT INTO maps (map_name, creator_id)
    VALUES ($1, $2)
    RETURNING maps.*;`, [mapName, mapCreator]
  )
}
module.exports = {userProfileById, mapsFromOtherUsers, allLocationsInMap, locationInfo, newMap, userMaps};
