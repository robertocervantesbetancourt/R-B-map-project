const userById = (db, id) => {
  return db.query(
    `SELECT users.name as name, profile_photo, maps.name as map_name
    FROM users JOIN maps ON users.id = user_id
    WHERE users.id = $1;`, [id]);
};

const mapsFromOtherUsers = (db, id) => {
  return db.query(
    `SELECT maps.* FROM maps
    WHERE NOT user_id = $1;`, [id]);
};

const allLocationsInMap = (db, id) => {
  return db.query(
    `SELECT locations.* FROM locations
    WHERE map_id = $1;`, [id]);
};

module.exports = {userById, mapsFromOtherUsers, allLocationsInMap};
