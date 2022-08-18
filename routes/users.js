/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT users.name as name, profile_photo, maps.name as map_name
      FROM users JOIN maps ON users.id = user_id
      WHERE users.id = $1;`, [req.params.id])
      .then(data => {
        const users = data.rows[0];
        const templateVars = {users};
        db.query(
          `SELECT maps.*
          FROM maps WHERE NOT user_id = $1;`, [req.params.id])
          .then(data => {
            const maps = data.rows;
            templateVars.maps = maps
            console.log(templateVars)
            res.render("routes_test", templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
