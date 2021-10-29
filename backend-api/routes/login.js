const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  // Hard-coded login
  const {email, password} = req.body;
  if (email === "sj@gameflix.com" && password === "testpass") {
    const query = `SELECT id, username FROM users WHERE id = 1`;
    db.query(query)
      .then(results => {
        res.json(results.rows[0]);
      })
      .catch(err => {
        console.log("Error:",err)
      })
  } else {
    res.status(401).send('Incorrect credentials');
  }
});

module.exports = router;
