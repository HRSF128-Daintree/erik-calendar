const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
//database
// 172.17.0.2
// mongoose.connect('mongodb://172.17.0.2/hotellist', option)
mongoose.connect('mongodb://localhost/hotellist', option)
  .then((result)=>{
    console.log('DB CONNECT');
  })
  .catch((err)=>{
    console.log('UNABLE TO CONNECT');
  });

const db = mongoose.connection;

//Test connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DATABASE CONNECTED!');
});
//

const hotelSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: false
  },
  hotelName: String,
  roomsTotal: Number,
  maxGuestPerRoom: Number,
  vacancy: [ {date: String, isBooked: Boolean} ],
  prices: [ {serviceName: String, price: Number} ]
});

const HotelClass = mongoose.model('hotels', hotelSchema);

module.exports.model = HotelClass;
module.exports.connection = db;

