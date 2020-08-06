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

const getHotelByZipcode = (zc, cb) => {
  pool
    .connect()
    .then(client => {
      return client
        .query(`SELECT * FROM hotel.hotels WHERE zipcode = '${zc}';`)
        .then(res => {
          client.release();
          cb(null, res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        });
    });
};

const getBookingsByAdultPrice = (price, cb) => {
  pool
    .connect()
    .then(client => {
      return client
        .query(`SELECT * FROM hotel.bookings WHERE adult_price < ${price} LIMIT 100;`)
        .then(res => {
          client.release();
          cb(null, res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        });
    });
};

const getHotelById = (id, cb) => {
  pool
    .connect()
    .then(client => {
      return client
        .query(`SELECT * FROM hotel.hotels WHERE hotel_id = ${id};`)
        .then(res => {
          client.release();
          cb(null, res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        });
    });
}

module.exports = {
  getHotelByZipcode: getHotelByZipcode,
  getBookingsByAdultPrice: getBookingsByAdultPrice,
  getHotelById: getHotelById,
};