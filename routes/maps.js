const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT locations.* FROM locations
      WHERE map_id = $1;`, [req.params.id])
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


