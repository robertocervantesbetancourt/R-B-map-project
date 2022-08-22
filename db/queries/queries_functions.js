const userProfileById = (db, id) => {
  return db.query(
    `SELECT users.* FROM users
    WHERE users.user_id = $1;`, [id]);
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
};

const newLocation = (db, locationName, locationDescription, locationLatitude, locationLongitude, locationPhoto, creatorID, mapID) => {
  return db.query(
    `INSERT INTO locations (location_name, location_image, location_description, location_latitude, location_longitude, map_id, creator_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING * ;`, [locationName, locationPhoto, locationDescription, locationLatitude, locationLongitude, mapID, creatorID]
  )
};

const firstMapFromUser = (db, userID) => {
  return db.query(
    `SELECT map_id FROM maps
    WHERE creator_id = $1
    ORDER BY map_id ASC
    LIMIT 1;`, [userID]
  )
}
module.exports = {userProfileById, mapsFromOtherUsers, allLocationsInMap, locationInfo, newMap, userMaps, newLocation, firstMapFromUser};
