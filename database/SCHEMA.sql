CREATE SCHEMA calendar;

CREATE TABLE calendar.hotels (
  hotel_id SERIAL INTEGER NOT NULL,
  room_id SERIAL INTEGER REFERENCES calendar.rooms,
  user_id INTEGER REFERENCES calendar.users,
  hotel_name VARCHAR(30) NOT NULL,
  total_rooms INTEGER NOT NULL,
  hotel_address VARCHAR (30) NOT NULL,
  checkin_date VARCHAR(20) NOT NULL,
  checkout_date VARCHAR(20) NOT NULL,
  hotel_service VARCHAR(20) NOT NULL,
  adults INT,
  children INT,
  rooms INT,
  price INT,
  PRIMARY KEY (hotel_id, room_id, user_id)
);

CREATE TABLE calendar.rooms (
  room_id SERIAL INTEGER NOT NULL,
  capacity INT,
  is_booked BOOLEAN,
  PRIMARY KEY (room_id)
)

CREATE TABLE calendar.users(
  user_id SERIAL INTEGER NOT NULL,
  user_bookings text[],
  email VARCHAR(30) NOT NULL,
  home_address VARCHAR(30) NOT NULL,
  guest BOOLEAN,
  PRIMARY KEY (user_id)
);