const {
  userProfileById,
  mapsFromOtherUsers,
  allLocationsInMap,
  locationInfo,
  newMap,
  userMaps,
  newLocation,
  firstMapFromUser,
  deleteLocation,
  locationLike,
  firstLocationInMap} = require('../db/queries/queries_functions');

const bodyParser = require('body-parser')
const cookieParser = require ('cookie-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  ////////////////// GET ROUTES //////////////////


router.get("/user/:id", (req, res) => {

    //variables setup
    let userID = req.params.id;
    let mapID = null;
    let templateVars = {};

    //add userID cookie
    res.cookie('userID', userID)
    console.log('get user/id route')


    //If there is already a mapID cookie and use it to exract all locations from that map
    if (req.cookies.mapID){
      console.log('there is a cookie');
      mapID = req.cookies.mapID;
      res.cookie('mapID', mapID)
      allLocationsInMap(db, mapID)
      .then((data) => {
        let locations = data.rows;
        templateVars.locations = locations
        userProfileById(db, userID)
        .then((data) => {
          let user = data.rows[0];
          templateVars.user = user;
          firstLocationInMap(db, mapID)
          .then ((data) => {
            let locationID = data && data.rows.length > 0 ? data.rows[0].location_id: '';
            userMaps(db, userID)
            .then((data) => {
              let userMaps = data.rows;
              templateVars.userMaps = userMaps;
              mapsFromOtherUsers(db, userID)
              .then((data) => {
                let otherMaps = data.rows;
                templateVars.otherMaps = otherMaps;
                locationInfo(db, locationID)
                .then((data) => {
                  let location = data.rows[0];
                  templateVars.location = location;
                  //console.log(templateVars);
                  res
                  //.clearCookie('mapID')
                  .render('index', templateVars)
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
    } else {
      console.log('there is no cookie');
      firstMapFromUser(db, userID)
      .then (data => {
        mapID = data.rows[0].map_id
        res.cookie('mapID', mapID)
        //console.log(mapID)
        allLocationsInMap(db, mapID)
        .then((data) => {
          let locations = data.rows;
          templateVars.locations = locations
          //console.log(templateVars)
          userProfileById(db, userID)
          .then((data) => {
            let user = data.rows[0];
            templateVars.user = user;
            firstLocationInMap(db, mapID)
            .then ((data) => {
              let locationID = data.rows[0].location_id;
              userMaps(db, userID)
              .then((data) => {
              let userMaps = data.rows;
              templateVars.userMaps = userMaps;
              mapsFromOtherUsers(db, userID)
              .then((data) => {
                let otherMaps = data.rows;
                templateVars.otherMaps = otherMaps;
                locationInfo(db, locationID)
                .then((data) => {
                  let location = data.rows[0];
                  templateVars.location = location;
                  //console.log(templateVars);
                  res
                  //.clearCookie('mapID')
                  .render('index', templateVars)
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
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
})

  // router.get("/location", (req, res) => {
  //   allLocationsInMap(db, req.cookies.mapID)
  //   .then(data => {

  //   })
  // })

  router.get("/google/map", (req, res) => {
    console.log('calling google maps...')
    console.log(`the cookie is: ${req.cookies.mapID}`)
    allLocationsInMap(db, req.cookies.mapID)
    .then(data => {
      const locations = data.rows;
      res.json(locations)
    })
  })
  router.get("/map", (req, res) => {
    userMaps(db, req.cookies.userID)
    .then(data => {
      const userMaps = data.rows;
      const templateVars = {userMaps}
      res.render("4_map_widget", templateVars)
    })
  })

  router.get("/map/:id", (req, res) => {
    allLocationsInMap(db, req.params.id)
      .then(data => {
        console.log('you are here')
        const locations = data.rows;
        const templateVars = {locations};
        res
          .cookie('mapID', `${req.params.id}`)
          .render('8_locations_form', templateVars)
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
        res.render("9_location_info", templateVars)
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
    console.log(userID)
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
