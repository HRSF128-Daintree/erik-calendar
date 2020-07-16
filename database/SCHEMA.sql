CREATE SCHEMA calendar;

CREATE TABLE calendar.bookings (
  bookings_id SERIAL INTEGER NOT NULL,
  hotel_id SERIAL INTEGER REFERENCES calendar.hotel,
  room_id SERIAL INTEGER REFERENCES calendar.rooms,
  guest_id INTEGER REFERENCES calendar.users,
  hotel VARCHAR(30) NOT NULL,
  'address' VARCHAR (30) NOT NULL,
  checkin VARCHAR(20) NOT NULL,
  checkout VARCHAR(20) NOT NULL,
  'service' VARCHAR(20) NOT NULL,
  adults INT,
  children INT,
  rooms INT,
  price INT,
  PRIMARY KEY (bookings_id)
);

CREATE TABLE calendar.hotel (
  hotel_id SERIAL INTEGER NOT NULL,
  zip_code INT,
  PRIMARY KEY(hotel_id)
)

CREATE TABLE calendar.rooms (
  room_id SERIAL INTEGER NOT NULL,
  hotel_id SERIAL INTEGER REFERENCES calendar.hotel,
  capacity INT,
  is_booked BOOLEAN,
  PRIMARY KEY (room_id)
)

CREATE TABLE calendar.users(
  user_id SERIAL INTEGER NOT NULL,
  email VARCHAR(30) NOT NULL,
  home_address VARCHAR(30) NOT NULL,
  guest BOOLEAN,
  PRIMARY KEY (user_id)
);
