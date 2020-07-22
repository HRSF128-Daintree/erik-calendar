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

\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL1.csv' DELIMITER ',' CSV HEADER;
\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL2.csv' DELIMITER ',' CSV;
\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL3.csv' DELIMITER ',' CSV;
\COPY hotel.hotels (hotel,address,zipcode) FROM '~/calendar/database/csvFiles/hotelsSQL4.csv' DELIMITER ',' CSV;

CREATE TABLE hotel.users(
  email VARCHAR(50) NOT NULL,
  home_address VARCHAR(100) NOT NULL,
  full_name VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL
);

\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL1.csv' DELIMITER ',' CSV HEADER;
\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL2.csv' DELIMITER ',' CSV;
\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL3.csv' DELIMITER ',' CSV;
\COPY hotel.users (email,home_address,full_name,phone_number) FROM '~/calendar/database/csvFiles/usersSQL4.csv' DELIMITER ',' CSV;


CREATE TABLE hotel.bookings (
  checkin VARCHAR(20) NOT NULL,
  checkout VARCHAR(20) NOT NULL,
  adults INT,
  children INT,
  adult_price INT,
  children_price INT
);

\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL1.csv' DELIMITER ',' CSV HEADER;
\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL2.csv' DELIMITER ',' CSV;
\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL3.csv' DELIMITER ',' CSV;
\COPY hotel.bookings (checkin,checkout,adults,children,adult_price,children_price) FROM '~/calendar/database/csvFiles/bookingsSQL4.csv' DELIMITER ',' CSV;

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