const express = require('express');
const router = express.Router();
const db = require('../db');

// Nested endpoints -> /users/:userid
router
  .get('/:user_id/filters', function(req, res) {
    const [userId] = req.params.user_id;
    const favQuery = `
      SELECT id, name, filter_settings FROM filters
      WHERE user_id = $1
    `

    db.query(favQuery, [userId])
      .then( result => {
        res.send(result.rows)
      })
      .catch(err => {
        console.log("Filters List DB Select Error::", err)
        res.send("Filters List DB Select Error");
      })
  })
  .get('/:user_id/filters/:filter_id', function(req, res) {
    const [userId, filterId] = [req.params.user_id, req.params.filter_id];
    const query = `
      SELECT filter_settings FROM filters
      WHERE user_id = $1 AND id = $2
    `
    
    db.query(query, [userId, filterId])
      .then( result => {
        res.send(result.rows[0].filter_settings);
      })
      .catch(err => {
        console.log("Filters Item DB Select Error::", err)
        res.send("Filters Item DB Select Error");
      })
  })
  .post('/:user_id/filters', function(req, res) {
    const [userId, {filterName, filterSettings}] = [req.params.user_id, req.body];
    const query = `
      INSERT INTO filters (user_id, name, filter_settings)
      VALUES ($1, $2, $3)
      ON CONFLICT ON CONSTRAINT user_filters DO NOTHING
      RETURNING *
    `

    db.query(query, [userId, filterName, filterSettings])
      .then( result => {
        res.send("Success");
      })
      .catch(err => {
        console.log("Filters DB Insert Error::", err)
        res.send("Filters DB Insert Error");
      })
  })
  .delete('/:user_id/filters/:filter_id', (req,res) => {
    const [userId, filterId] = [req.params.user_id, req.params.filter_id];
    const query = `
      DELETE FROM filters
      WHERE user_id = $1 AND id = $2
      RETURNING *
    `

    db.query(query, [userId, filterId])
      .then(result => {
        res.send("Success");
      })
      .catch(err => {
        console.log("Filters DB Delete Error::", err)
        res.send("Filters DB Delete Error");
      })
  });

module.exports = router;
