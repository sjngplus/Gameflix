const express = require('express');
const router = express.Router();
const db = require('../db');

// Nested endpoints -> /users/:userid
router
  .get('/:user_id/filters', function(req, res) {
    const [userId] = req.params.user_id;
    const favQuery = `
      SELECT name, filter_settings FROM filters
      WHERE user_id = $1
    `

    db.query(favQuery, [userId])
      .then( result => {
        result.rows.map(row => row.steam_app_id)
      })
      .catch(err => {
        console.log("Filters List DB Select Error::", err)
        res.send("Filters List DB Select Error");
      })
  })
  .get('/:user_id/filters/:steam_id', function(req, res) {
    const [userId, steamAppId] = [req.params.user_id, req.params.steam_id];
    const query = `
      SELECT * FROM favorites
      WHERE user_id = $1 AND steam_app_id = $2
    `
    
    db.query(query, [userId, steamAppId])
      .then( result => {
        res.send(result.rows.length === 1);
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
  .delete('/:user_id/filters/:steam_id', (req,res) => {
    const [userId, steamAppId] = [req.params.user_id, req.params.steam_id];
    const query = `
      DELETE FROM favorites
      WHERE user_id = $1 AND steam_app_id = $2
      RETURNING *
    `

    db.query(query, [userId, steamAppId])
      .then(result => {
        res.send("Success");
      })
      .catch(err => {
        console.log("Filters DB Delete Error::", err)
        res.send("Filters DB Delete Error");
      })
  });

module.exports = router;
