const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');
const controller = require('./controller/hotelControllers.js');


const port = 3003;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

  app.use(express.static('public'));

  app.get('/api/hotel/:hotelId/calendar', controller.getHotelById);

  app.get('/api/zipcode/:zipcode/calendar', controller.getHotelByZipcode);

  app.get('/api/bookings/:adultprice/calendar', controller.getBookingsByAdultPrice);
}
