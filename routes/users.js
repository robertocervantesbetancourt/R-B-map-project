/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const {userById, mapsFromOtherUsers} = require('../db/queries/queries_functions');
const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    userById(db, req.params.id)
      .then(data => {
        const users = data.rows[0];
        const templateVars = {users};
        mapsFromOtherUsers(db, req.params.id)
          .then(data => {
            const maps = data.rows;
            templateVars.maps = maps
            res.render("index", templateVars);
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
