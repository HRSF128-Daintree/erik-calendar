CREATE SCHEMA calendar;

CREATE TABLE calendar.hotels (
  hotel_id SERIAL INTEGER NOT NULL,
  hotel_name VARCHAR(30) NOT NULL,
  total_rooms INTEGER NOT NULL,
  hotel_location DECIMAL (2, 3),
  bookings_id INTEGER REFERENCES calendar.bookings(booking_id),
  PRIMARY KEY (hotel_id, bookings_id)
);

CREATE TABLE calendar.bookings(
  booking_id SERIAL INTEGER NOT NULL,
  booking_dates text ARRAY,
  is_booked BOOLEAN,
  service_id INTEGER REFERENCES calendar.services(services_id),
  PRIMARY KEY (booking_id)
);

CREATE TABLE calendar.users(
  user_id SERIAL INTEGER NOT NULL,
  user_bookings text[],
  user_location DECIMAL (2, 3),
  booking_ids INTEGER REFERENCES calendar.bookings(booking_id),
  guest BOOLEAN,
  PRIMARY KEY (user_id, booking_ids)
);

CREATE TABLE calendar.services(
  services_id SERIAL INTEGER NOT NULL,
  services_name text,
  prices INTEGER,
  PRIMARY KEY (services_id)
);