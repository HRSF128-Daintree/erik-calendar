const faker = require('faker');
const moment = require('moment');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');


const availableBookings = [];
const availableRooms = [];
// const majorCities = [
//   { city: 'San Francisco CA',
//     zc: 94016,
//   }, {
//     city: 'Los Angeles CA',
//     zc: 90001,
//   }, {
//     city: 'Denver CO',
//     zc: 80014,
//   }, {
//     city: 'New York City NY',
//     zc: 10001,
//   }, {
//     city: 'Miami FL',
//     zc: 33101,
//   }, {
//     city: 'Portland OR',
//     zc: 97035,
//   }, {
//     city: 'Dallas TX',
//     zc: 75001,
//   }, {
//     city: 'Honolulu HI',
//     zc: 96795,
//   }, {
//     city: 'Seattle WA',
//     zc: 98101
//   }, {
//     city: 'Las Vegas NV',
//     zc: 88901,
//   }, {
//     city: 'Chicago IL',
//     zc: 60007,
//   }, {
//     city: 'Houston TX',
//     zc: 77001,
//   }, {
//     city: 'Phoenix AZ',
//     zc: 85001,
//   }
// ];

const hotelInfo = [];

const hotels = ['Hyatt Hotel', 'The Merriot', 'MGM Grand', 'The Ambassador', 'Holiday Inn', 'Red Log Cabin', 'Hilton', 'Four Seasons Resort', 'The Hotel California', 'Joe\'s Crab Shack', 'A Cardboard Box', 'Generic Lodge', 'The Death Star', 'The Shire', 'The Moon', 'Oscar\'s Trash Can', 'McDonald Playplace', 'Shrek\'s Swamp'];

let startDate = moment('2020-01-01');

for (let currDay = 0; currDay < 4381; currDay++) {
  startDate = moment(startDate, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
  availableBookings.push(startDate);
}



const state = {};

const nop = () => {};

const buffer = (data) => {
  const last = state.lastBufferedRequest;
  state.lastBufferedRequest = {
    chunk: Buffer.from(data),
    encoding: 'buffer',
    isBuf: true,
    callback: nop,
    next: null
  };

  if (last) {
    last.next = state.lastBufferedRequest;
  } else {
    state.bufferedRequest = state.lastBufferedRequest;
    state.bufferedRequestCount += 1;
  }

};

const start = [process.memoryUsage().heapUsed];

let fileNum = 0;

const writeHotels = fs.createWriteStream(__dirname + `/csvFiles/hotels${fileNum}.csv`);
const hHeaders = 'hotel_id,hotel,address,zipcode,checkin,checkout,adults,children,adult_price,children_price,guest_id,booking_id,email,phone_number,full_name\n';
writeHotels.write(hHeaders, 'utf8');

const writeTenMillionHotels = (writer, encoding, callback) => {

  let i = 10000000;
  let id = 0;
  const write = () => {
    let ok = true;
    while (ok && i > 0) {
      i--;
      id++;
      if (id % 1000000 === 0) {
        const used = (process.memoryUsage().heapUsed - start) / 1024 / 1024;
        console.log(`${Math.round(used * 100) / 100} MB`);
        console.log(id);
      }
      const hotel_id = i;
      const hotel = hotels[faker.random.number(hotels.length)];
      const address = faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.city();
      const zipcode = faker.address.zipCode();
      const row = `${hotel_id},${hotel},${address},${zipcode}\n`;
      if (i === 0) {
        writer.write(row, encoding, callback);
      } else {
        ok = writer.write(row);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeTenMillionHotels(writeHotels, 'utf-8', () => {
  writeHotels.end();
});

////////////////////////////////////////////////////

// const csvData = [];

// const writeBookings = (start, end, fileNum) => {
//   const batchSize = 1000000;
//   const ws = fs.createWriteStream(__dirname + `/csvFiles/hotelInfo${fileNum}.csv`);
//   const writeData = async() => {
//     for (let i = start, id = end; i <= end; i++, id--) {
//       // let randomCity = faker.random.number(majorCities.length);
//       const randBooking = faker.random.number(availableBookings.length);
//       let data =
//         {
//           hotel_id: i,
//           hotel: hotels[faker.random.number(hotels.length)],
//           address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.city(),
//           zipcode: faker.address.zipCode(),
//           checkin: availableBookings[faker.random.number(randBooking)],
//           checkout: availableBookings[faker.random.number(randBooking + 2)],
//           adults: faker.random.number(5),
//           children: faker.random.number(5),
//           adult_price: faker.random.number({ 'min': 150, 'max': 450 }),
//           children_price: faker.random.number({ 'min': 40, 'max': 80 }),
//           guest_id: id,
//           booking_id: id,
//           email: faker.internet.email(),
//           phone_number: faker.phone.phoneNumber(),
//           full_name: faker.name.findName(),
//         };
//       csvData[csvData.length] = data;
//       buffer([data]);
//       const buf = Buffer.from([data]);
//       if (!ws.write(buf)) {
//         await fs.createWriteStream(__dirname + `/csvFiles/hotelInfo${fileNum}.csv`).once('drain', writeData);
//       }
//       // csvData.push(data);
//       if (csvData.length % batchSize === 0) {
//         fastcsv.write(csvData, { headers: true })
//           .pipe(fs.createWriteStream(__dirname + `/csvFiles/hotelInfo${fileNum}.csv`))
//           .on('finish', () => { console.log('finished writing'); process.exit(); });
//         csvData.length = 0;
//         fileNum++;
//         console.log(fileNum);
//       }
//       if (i % 100000 === 0) {
//         setImmediate(() => {
//           csvData[csvData.length] = data;
//         });
//         const used = (process.memoryUsage().heapUsed - start) / 1024 / 1024;
//         console.log(`${Math.round(used * 100) / 100} MB`);
//         console.log('passed: ', i);
//       }
//     }
//   };
//   writeData();
// };




// writeBookings(0, 10000000, 0);

////////////////////////////////////////////////////
