const faker = require('faker');
const moment = require('moment');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');


const availableBookings = [];

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

const writeBookings = fs.createWriteStream(__dirname + `/../csvFiles/bookings${fileNum}.csv`);
const bHeaders = 'booking_id,adults,children,checkin,checkout,adult_price,children_price\n';
writeBookings.write(bHeaders, 'utf8');

const writeTenMillionBookings = (writer, encoding, callback) => {

  let i = 10000000;
  let id = 0;
  const write = () => {
    let ok = true;
    while (ok && i > 0) {
      const randBooking = faker.random.number(availableBookings.length);
      i--;
      id++;
      if (id % 1000000 === 0) {
        const used = (process.memoryUsage().heapUsed - start) / 1024 / 1024;
        console.log(`${Math.round(used * 100) / 100} MB`);
        console.log(id);
      }
      const booking_id = id;
      const adults = faker.random.number(5);
      const children = faker.random.number(5);
      const checkin = availableBookings[randBooking];
      const checkout = availableBookings[randBooking + 2];
      const adult_price = faker.random.number({ 'min': 150, 'max': 450 });
      const children_price = faker.random.number({ 'min': 40, 'max': 80 });
      const row = `${booking_id},${adults},${children},${checkin},${checkout},${adult_price},${children_price}\n`;
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

writeTenMillionBookings(writeBookings, 'utf-8', () => {
  writeBookings.end();
});