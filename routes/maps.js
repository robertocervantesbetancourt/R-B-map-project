const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT locations.* FROM locations
      WHERE map_id = 1;`)
      .then(data => {
        const locations = data.rows;
        const templateVars = {locations};
        console.log(locations[0].latitude)
        res.render("test_empty", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// module.exports = (db) => {
//   router.get("/:id", (req, res) => {
//     db.query(
//       `SELECT users.name as name, profile_photo, maps.name as map_name
//       FROM users JOIN maps ON users.id = user_id
//       WHERE users.id = $1;`, [req.params.id])
//       .then(data => {
//         const users = data.rows[0];
//         const templateVars = {users};
//         res.render("routes_test", templateVars);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
