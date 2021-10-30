const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res, next) => {
  const fetchUser = (query) => {
    db.query(query)
      .then(results => {
        res.send(results.rows[0])
      })
      .catch(err => {
        console.log("Error:",err)
      })
  }
  
  // Hard-coded login
  const {email, password} = req.body;
  if (email === "sj@gameflix.com") {
    const query = `SELECT id, username FROM users WHERE id = 1`;
    fetchUser(query);
  } else if (email === "cx@gameflix.com") {
    const query = `SELECT id, username FROM users WHERE id = 2`;
    fetchUser(query);
  } else {
    res.status(401).send('Incorrect credentials');
  }
});

module.exports = router;
