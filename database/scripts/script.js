import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    {duration: '1s', target: 1},
    {duration: '1s', target: 10},
    {duration: '1s', target: 100},
    {duration: '1s', target: 1000},
    {duration: '15s', target: 1500},
    {duration: '15s', target: 3000},
  ],
};

export default function() {
  let hotelId = Math.floor(Math.random() * 10000000) + 1;
  const url = `http://localhost:3003/api/hotel/${hotelId}/calendar`;
  http.get(url);
  sleep(1);
}