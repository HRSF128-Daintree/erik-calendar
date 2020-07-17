// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const option = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// };
//database
// 172.17.0.2
// mongoose.connect('mongodb://172.17.0.2/hotellist', option)
// mongoose.connect('mongodb://localhost/hotellist', option)
//   .then((result)=>{
//     console.log('DB CONNECT');
//   })
//   .catch((err)=>{
//     console.log('UNABLE TO CONNECT');
//   });

// const db = mongoose.connection;

// //Test connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('DATABASE CONNECTED!');
// });
// //

// const hotelSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     unique: false
//   },
//   hotelName: String,
//   roomsTotal: Number,
//   maxGuestPerRoom: Number,
//   vacancy: [ {date: String, isBooked: Boolean} ],
//   prices: [ {serviceName: String, price: Number} ]
// });

/*
///////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

// const ExpressCassandra = require('express-cassandra');
// const Models = ExpressCassandra.createClient({
//   clientOptions: {
//     contactPoints: ['127.0.0.1'],
//     protocolOptions: { port: 9042 },
//     keyspace: 'test',
//     queryOptions: { consistency: ExpressCassandra.consistencies.one }
//   },
//   ormOptions: {
//     defaultReplicationStrategy: {
//       class: 'SimpleStrategy',
//       'replication_factor': 1
//     },
//     migration: 'safe'
//   }
// });

// const MyModel = Models.loadSchema('Hotel', {
//   fields: {
//     'hotel_Id': {
//       type: 'uuid',
//       default: { '$db_function': 'uuid()' },
//     },
//     name: 'text',
//     brand: 'text',
//     rooms: 'int',
//   },
//   key: ['hotel_Id']
// });

// MyModel = Models.loadSchema('Bookings', {
//   fields: {
//     ''
//   }
// })

// console.log(Models.instance.Hotel === MyModel);

// MyModel.syncDB((err, result) => {
//   if (err) {
//     throw err;
//   }
// });

// CREATE TABLE "my_hotels" (
//   hotel_id uuid PRIMARY KEY,
//   hotel text,
//   rooms int,
//   guestPerRoom int,
// )

// CREATE TABLE "bookings" (
//   booking_id uuid,
//   booked boolean,
//   date set<text>,
//   price
//   PRIMARY KEY ((id))
// )

// CREATE TABLE "services" (
//   service_id uuid,
//   service text,
//   price int,
// )

// CREATE TABLE "users" (
//   user_id uuid,
//   guest boolean,
//   bookings uuid,
// )

// const HotelClass = mongoose.model('hotels', hotelSchema);

// module.exports.model = HotelClass;
// module.exports.connection = client;
// Models.export(__dirname + '/fixtures', (err) => {
//   if (err) {
//     throw err;
//   }
// });

// Models.import(__dirname + '/fixtures', { batchSize: 10000 }, (err) => {
//   if (err) {
//     throw err;
//   }
// });

