DROP SCHEMA hotel CASCADE;
CREATE SCHEMA IF NOT EXISTS hotel;

CREATE TABLE hotel.hotels (
  hotel_id SERIAL,
  hotel VARCHAR(30) NOT NULL,
  address VARCHAR (100) NOT NULL,
  zipcode VARCHAR(20) NOT NULL,
  PRIMARY KEY(hotel_id)
);

\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL0.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE hotel.users(
  guest_id SERIAL,
  email VARCHAR(50) NOT NULL,
  home_address VARCHAR(100) NOT NULL,
  full_name VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  PRIMARY KEY (guest_id)
);

\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL0.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE hotel.bookings (
  bookings_id SERIAL,
  hotel_id INT,
  guest_id INT,
  checkin VARCHAR(20) NOT NULL,
  checkout VARCHAR(20) NOT NULL,
  adults INT,
  children INT,
  adult_price INT,
  children_price INT,
  PRIMARY KEY (bookings_id),
  CONSTRAINT fk_hotel
    FOREIGN KEY(hotel_id)
      REFERENCES hotel.hotels(hotel_id),
  CONSTRAINT fk_guest
    FOREIGN KEY(guest_id)
      REFERENCES hotel.users(guest_id)
);

\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL0.csv' DELIMITER ',' CSV HEADER;
