const Model = require('../models/hotelModels.js');

const getHotelByZipcode = (req, res) => {
  const zipcode = req.params.zipcode;
  console.log(req.params);
  Model.get(`SELECT * FROM hotel.hotels WHERE zipcode = '${zipcode}';`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
};

const getBookingsByAdultPrice = (req, res) => {
  const price = req.params.adultprice;
  Model.get(`SELECT * FROM hotel.bookings WHERE adult_price < ${price} LIMIT 100;`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
};

const getHotelById = (req, res) => {
  const id = req.params.hotelId;
  Model.get(`SELECT * FROM hotel.hotels WHERE hotel_id = ${id};`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
};

module.exports = {
  getHotelById: getHotelById,
  getHotelByZipcode: getHotelByZipcode,
  getBookingsByAdultPrice: getBookingsByAdultPrice,
};