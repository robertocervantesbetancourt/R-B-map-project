const {userProfileById, mapsFromOtherUsers, allLocationsInMap, locationInfo, newMap, userMaps, newLocation, firstMapFromUser, deleteLocation, locationLike} = require('../db/queries/queries_functions');
const bodyParser = require('body-parser')
const cookieParser = require ('cookie-parser')

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
              firstMapFromUser(db, req.params.id)
              .then(data => {
                const mapID = data.rows[0].map_id
                allLocationsInMap(db, 3)
                .then(data => {
                  const locations = data.rows;
                  templateVars.locations = locations;
                  res
                  .cookie('userID', `${req.params.id}`)
                  .cookie('mapID', mapID)
                  .render("routes_test", templateVars);
                })
              })
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
        res
          .cookie('mapID', `${req.params.id}`)
          .render("test_locations", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          //.json({ error: err.message });
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

  router.post("/map", (req, res) => {
    const userID = req.cookies.userID
    newMap(db, req.body.map_name,userID)
      .then(data => {
          res.status(201).send();
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  router.post("/location", (req, res) => {
    const userID = req.cookies.userID;
    const mapID = req.cookies.mapID;
    newLocation(db, req.body.name, req.body.description, req.body.latitude, req.body.longitude, req.body.image, userID, mapID)
    .then(data => {
      res
      .status(201).send()
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  //////////////////// DELETE ROUTES ///////////////////////////

  router.post("/location/:id/delete", (req, res) => {
    console.log(req.params.id)
    deleteLocation(db, req.params.id)
    .then(data => {
      res.status(201).send()
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  //////////////////// LIKE ROUTES ////////////////////////////

  router.post("/location/:id/like", (req, res) => {
    locationLike(db, req.cookies.userID, req.params.id)
    .then(data => {
      res.status(201).send()
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};
