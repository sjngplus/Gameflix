const express = require('express');
const router = express.Router();
const db = require('../db');

// Nested endpoints -> /users/:userid
router
  .get('/:user_id/favorites/:steam_id', function(req, res) {
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
        console.log("Favorites DB Select Error::", err)
        res.send("Favorites DB Select Error");
      })
  })
  .post('/:user_id/favorites', function(req, res) {
    const [userId, steamAppId] = [req.params.user_id, req.body.steamAppId];
    const query = `
      INSERT INTO favorites (user_id, steam_app_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT user_favs DO NOTHING
      RETURNING *
    `

    db.query(query, [userId, steamAppId])
      .then( result => {
        res.send("Success");
      })
      .catch(err => {
        console.log("Favorites DB Insert Error::", err)
        res.send("Favorites DB Insert Error");
      })
  })
  .delete('/:user_id/favorites/:steam_id', (req,res) => {
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
        console.log("Favorites DB Delete Error::", err)
        res.send("Favorites DB Delete Error");
      })
  });

module.exports = router;
