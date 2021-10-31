const express = require('express');
const router = express.Router();
const db = require('../db');

// Nested endpoints -> /users/:userid
router.
  post('/:user_id/favorites', function(req, res) {
    const [userId, steamAppId] = [req.params.user_id, req.body.steamAppId];
    const query = `
      INSERT INTO favorites (user_id, steam_app_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT user_favs DO NOTHING
      RETURNING *
    `
    
    db.query(query, [userId, steamAppId])
      .then( result => {
        console.log(result);
        res.send("Success");
      })
      .catch(err => {
        console.log("Favorites DB Insert Error::", err)
        res.send("Favorites DB Insert Error");
      })
  });

module.exports = router;
