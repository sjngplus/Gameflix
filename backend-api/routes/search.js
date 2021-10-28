const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

const insertSteamGamesIntoDb = (steamAppId, gameObj) => {
  const gameStringified = JSON.stringify(gameObj);
  const query = `
  INSERT INTO steam (id, game) 
  VALUES($1, $2)
  ON CONFLICT (id)
  DO NOTHING
  RETURNING *`
  db.query(query, [steamAppId, gameStringified])
    .then()
    .catch(err => console.log("DB Insert Error::", err));  
  // db.query("SELECT game FROM steam WHERE id = 388960").then(results => console.log(results.rows));
}

const pingCheapSharkApi = (title, limit) => {
  const url = `https://www.cheapshark.com/api/1.0/games?title=${title}&limit=${limit}`
  return axios.get(url).then((res) => {
    return res.data;
  }).catch(err => console.log(err))
};


const pingSteamApi = (responseDataArray) => {
  console.log("::Pinging Steam API")
  return axios.all(responseDataArray.map((responseData) => {
    const appId = responseData.steamAppID;
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
    if (appId) {
      return axios.get(url)
      .then((res) => {
        insertSteamGamesIntoDb(appId, res.data[appId].data);
        return res.data[appId].data;
      })
      .catch(err => console.log(err))
    }
  }))
};


router.get('/deals', (req, res) => {  
  const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20`;
  axios.get(url)
  .then(res => pingSteamApi(res.data))
  .then((resolve) => {
    const filterOutNull = resolve.filter(el => el);
    res.json(filterOutNull);
  })
  .catch(err => console.log(err));  
});

router.get('/database', (req, res) => {
  const query = `SELECT game FROM steam`
  db.query(query).then(results => {
    const parsedResults = results.rows.map(result => result.game);
    const filterOutNull = parsedResults.filter(el => el);
    res.json(filterOutNull);
  });
});


router.get('/:params', (req, res) => {
  const title = req.query.title;
  const limit = req.query.limit;
  pingCheapSharkApi(title, limit)
  .then((resolve) => pingSteamApi(resolve).then(res => res))
  .then(resolve => {
    const filterOutNull = resolve.filter(el => el);   
    res.json(filterOutNull);
  })
  .catch(err => console.log(err)); 

});






module.exports = router;