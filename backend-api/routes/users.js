var express = require('express');
var router = express.Router();
const favoritesRouter = require('./favorites.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Nested endpoint for favorites
router.use('/', favoritesRouter)

module.exports = router;
