const {userProfileById, mapsFromOtherUsers, allLocationsInMap, locationInfo, newMap, userMaps} = require('../db/queries/queries_functions');
const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  ////////////////// GET ROUTES //////////////////

  router.get("/user/:id", (req, res) => {
    userProfileById(db, req.params.id)
      .then(data => {
        const user = data.rows[0];
        const templateVars = {user};
        userMaps(db, req.params.id)
        .then(data => {
          const userMaps = data.rows;
          templateVars.userMaps = userMaps
          mapsFromOtherUsers(db, req.params.id)
            .then(data => {
              const otherMaps = data.rows;
              templateVars.otherMaps = otherMaps
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
        res.render("test_loc_info", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //////////////////// POST ROUTES ///////////////////////////

  router.post("/map/creator/:id", (req, res) => {
    newMap(db, req.body.map_name,req.params.id)
      .then(data => {
        userMaps(db, req.params.id)
        .then(data => {
          const userMaps = data.rows;
          const templateVars = {userMaps}
          console.log(templateVars)
        })
        // res.render("test_map_widget", templateVars)
        //res.json(data.rows);
        res.status(201).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
