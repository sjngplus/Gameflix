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


const filterByPrice = (inputArray, priceLowerLimit, priceUpperLimit) => {
  const outputArray = [];
  inputArray.forEach(game => {
    if (game.price_overview && game.price_overview.final >= priceLowerLimit && game.price_overview.final <= priceUpperLimit) {
      outputArray.push(game)
    }
  });
  return outputArray
}


const pingCheapSharkApi = (title, limit) => {
  const url = `https://www.cheapshark.com/api/1.0/games?title=${title}&limit=${limit}`
  return axios.get(url).then((res) => {
    // console.log(res.data)
    return res.data;
  }).catch(err => console.log(err))
};


const pingSteamApi = (responseDataArray) => {
  return axios.all(responseDataArray.map((responseData) => {
    const appId = responseData.steamAppID;
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
    if (appId) {
      return axios.get(url)
      .then((res) => {
        insertSteamGamesIntoDb(appId, res.data[appId].data)
        return res.data[appId].data;
      })
      .catch(err => console.log(err))
    }
  }))
};


router.get('/deals', (req, res) => {

  db.query("SELECT game -> 'name' AS name FROM steam").then(results => console.log(results.rows));
  //CheapShark API pull for all deals on Steam
  const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=10`;
  axios.get(url)
  .then(res => pingSteamApi(res.data))
  .then((resolve) => {
    const filterOutNull = resolve.filter(el => el);
    res.json(filterOutNull);
  })
  .catch(err => console.log(err));
  
});


router.get('/:params', (req, res) => {
  db.query("SELECT game -> 'name' AS name FROM steam").then(results => console.log(results.rows));
  // console.log(req.query)
  const title = req.query.title;
  const limit = req.query.limit;
  const lowerPriceLimit = req.query.lowerPrice * 100;
  const upperPriceLimit = req.query.upperPrice * 100;
  pingCheapSharkApi(title, limit)
  .then((resolve) => pingSteamApi(resolve).then(res => res))
  .then(resolve => {
    const filterOutNull = resolve.filter(el => el);
    const filteredByPrice = filterByPrice(filterOutNull, lowerPriceLimit, upperPriceLimit)
    res.json(filteredByPrice);
  })
  .catch(err => console.log(err)); 

});






module.exports = router;