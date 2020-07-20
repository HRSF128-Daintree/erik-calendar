const faker = require('faker');
const moment = require('moment');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');


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

const writeUsers = fs.createWriteStream(__dirname + `/../csvFiles/users${fileNum}.csv`);
const uHeaders = 'guest_id,email,full_name,phone_number\n';
writeUsers.write(uHeaders, 'utf8');

const writeTenMillionUsers = (writer, encoding, callback) => {

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
      const guest_id = id;
      const email = faker.internet.email();
      const full_name = faker.name.findName();
      const phone_number = faker.phone.phoneNumber();
      const row = `${guest_id},${email},${full_name},${phone_number}\n`;
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

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});