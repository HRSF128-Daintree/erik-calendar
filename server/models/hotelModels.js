const pg = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'brokeboi',
  host: 'localhost',
  database: 'brokeboi',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});

module.exports = {
  pool: pool,
};