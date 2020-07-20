DROP SCHEMA IF EXISTS hotel CASCADE;
CREATE SCHEMA IF NOT EXISTS hotel;
ALTER SYSTEM SET wal_level = minimal;
ALTER SYSTEM SET archive_mode = off;
ALTER SYSTEM SET max_wal_senders = 0;

CREATE TABLE hotel.hotels (
  hotel VARCHAR(30) NOT NULL,
  address VARCHAR (100) NOT NULL,
  zipcode VARCHAR(20) NOT NULL
);

\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL0.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE hotel.users(
  email VARCHAR(50) NOT NULL,
  home_address VARCHAR(100) NOT NULL,
  full_name VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL
);

\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL0.csv' DELIMITER ',' CSV HEADER;


CREATE TABLE hotel.bookings (
  checkin VARCHAR(20) NOT NULL,
  checkout VARCHAR(20) NOT NULL,
  adults INT,
  children INT,
  adult_price INT,
  children_price INT
);

\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL0.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE hotel.hotels ADD COLUMN hotel_id SERIAL PRIMARY KEY;
ALTER TABLE hotel.users ADD COLUMN guest_id SERIAL PRIMARY KEY;
ALTER TABLE hotel.bookings ADD COLUMN bookings_id SERIAL PRIMARY KEY;
ALTER TABLE hotel.bookings ADD COLUMN hotel_id SERIAL NOT NULL;
ALTER TABLE hotel.bookings ADD COLUMN guest_id SERIAL NOT NULL;
ALTER TABLE hotel.bookings ADD CONSTRAINT guest_fk
FOREIGN KEY (guest_id) REFERENCES hotel.users (guest_id);
ALTER TABLE hotel.bookings ADD CONSTRAINT hotel_fk
FOREIGN KEY (hotel_id) REFERENCES hotel.hotels (hotel_id);

VACUUM;