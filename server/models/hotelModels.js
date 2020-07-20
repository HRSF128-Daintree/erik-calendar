const pg = require('pg');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'brokeboi',
  host: 'localhost',
  database: 'brokeboi',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});


const get = (query, cb) => {
  pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(res => {
          client.release();
          cb(res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        });
    });
};

module.exports = {
  get: get,
};