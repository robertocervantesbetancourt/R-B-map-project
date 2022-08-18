const bodyParser = require('body-parser')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT locations.* FROM locations
      WHERE locations.id = $1;`, [req.params.id])
      .then(data => {
        const location = data.rows;
        const templateVars = {location};
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
