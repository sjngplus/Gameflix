// const pg = require('pg');
// require('dotenv').config();

// const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable` ;

// const client = new pg.Client({
//     connectionString: connectionString || process.env.DATABASE_URL,
// });

// console.log( `Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}` );
// client.connect();

// module.exports = client;


const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
