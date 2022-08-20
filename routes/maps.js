const bodyParser = require('body-parser')

const {allLocationsInMap} = require('../db/queries/queries_functions');

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    allLocationsInMap(db, req.params.id)
      .then(data => {
        const locations = data.rows;
        const templateVars = {locations};
        res.render('routes_test', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};


