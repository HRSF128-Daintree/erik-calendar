const Model = require('../models/hotelModels.js');

const getHotelByZipcode = (zc, cb) => {
  Model.pool
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
  Model.pool
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
  Model.pool
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
};

module.exports = {
  getHotelById: getHotelById,
  getHotelByZipcode: getHotelByZipcode,
  getBookingsByAdultPrice: getBookingsByAdultPrice,
};