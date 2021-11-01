const express = require('express');
const router = express.Router();
const db = require('../db');

// Nested endpoints -> /users/:userid
router
  .get('/:user_id/favorites', function(req, res) {
    const [userId] = req.params.user_id;
    const favQuery = `
      SELECT steam_app_id FROM favorites
      WHERE user_id = $1
    `
    const gameQuery = `
      SELECT game FROM STEAM
    `

    db.query(favQuery, [userId])
      .then( result => result.rows.map(row => row.steam_app_id))
      .then(favGameIds => {
        db.query(gameQuery)
          .then(result => {
            const favGameObj = result.rows.filter(row => favGameIds.includes(row.game.steam_appid));
            const favGameInfo = favGameObj.map(obj => {
              return {"name": obj.game.name, "id": obj.game.steam_appid}
            });
            // console.log(favGameInfo);
            res.send(favGameInfo);
          })
      })
      .catch(err => {
        console.log("Favorites List DB Select Error::", err)
        res.send("Favorites List DB Select Error");
      })
  })
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
        console.log("Favorite Item DB Select Error::", err)
        res.send("Favorite Item DB Select Error");
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
