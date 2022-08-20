const {userById, mapsFromOtherUsers, allLocationsInMap, locationInfo, newMap} = require('../db/queries/queries_functions');
const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/user/:id", (req, res) => {
    userById(db, req.params.id)
      .then(data => {
        const users = data.rows[0];
        const templateVars = {users};
        mapsFromOtherUsers(db, req.params.id)
          .then(data => {
            const maps = data.rows;
            templateVars.maps = maps
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

  router.get("/map/:id", (req, res) => {
    allLocationsInMap(db, req.params.id)
      .then(data => {
        const locations = data.rows;
        const templateVars = {locations};
        res.render("test_locations", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/location/:id", (req, res) => {
    locationInfo(db, req.params.id)
      .then(data => {
        const location = data.rows[0];
        const templateVars = {location};
        console.log(templateVars)
        res.render("test_loc_info", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/map/creator/:id", (req, res) => {
    newMap(db, req.body.map_name,req.params.id)
      .then(data => {
        console.log(data.rows)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
