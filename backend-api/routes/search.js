const express = require('express');
const router = express.Router();
const axios = require('axios');


const pingCheapSharkApi = (title, limit) => {
  const url = `https://www.cheapshark.com/api/1.0/games?title=${title}&limit=${limit}`
  return axios.get(url).then((res) => {
    return res.data;
  }).catch(err => console.log(err))
};

const pingSteamApi = (responseDataArray) => {
  return axios.all(responseDataArray.map((responseData) => {
    const appId = responseData.steamAppID;
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
    if (appId) {
      return axios.get(url).then((res) => {
        // console.log(res.data);
        return res.data;
      }).catch(err => console.log(err))
    }
  }))
};

router.get('/:params', function(req, res) {

  console.log(req.query)
  const title = req.query.title;
  const limit = 4;
  pingCheapSharkApi(title, limit)
  .then((res) => {
    console.log(res);
    return pingSteamApi(res).then(res => res)
  }).then(resolve => res.json(resolve))
    .catch(err => console.log(err)); 

});

module.exports = router;
