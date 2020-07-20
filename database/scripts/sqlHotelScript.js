const faker = require('faker');
const moment = require('moment');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');

const hotelInfo = [];

const hotels = ['Hyatt Hotel', 'The Merriot', 'MGM Grand', 'The Ambassador', 'Holiday Inn', 'Red Log Cabin', 'Hilton', 'Four Seasons Resort', 'The Hotel California', 'Joes Crab Shack', 'A Cardboard Box', 'Generic Lodge', 'The Death Star', 'The Shire', 'The Moon', 'Oscars Trash Can', 'McDonald Playplace', 'Shreks Swamp'];

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

const writeHotels = fs.createWriteStream(__dirname + `/../csvFiles/hotelsSQL${fileNum}.csv`);
const hHeaders = 'hotel,address,zipcode\n';
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
      const hotel = hotels[faker.random.number(hotels.length - 1)];
      const address = faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.city();
      const zipcode = faker.address.zipCode();
      const row = `${hotel},${address},${zipcode}\n`;
      if (i === 0) {
        writer.write(row, encoding, callback);
      } else {
        ok = writer.write(row, encoding);
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