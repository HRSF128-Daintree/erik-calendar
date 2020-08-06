const Model = require('../models/hotelModels.js');

const getHotelByZipcode = (zc, cb) => {
  Model.getHotelByZipcode(zc, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const getBookingsByAdultPrice = (price, cb) => {
  Model.getBookingsByAdultPrice(price, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const getHotelById = (id, cb) => {
  Model.getBookingsByAdultPrice(id, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = {
  getHotelById: getHotelById,
  getHotelByZipcode: getHotelByZipcode,
  getBookingsByAdultPrice: getBookingsByAdultPrice,
};