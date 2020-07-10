CREATE TABLE my_hotels (
  hotel_id int,
  hotel text,
  PRIMARY KEY ((hotel_id, hotel)) WITH CLUSTERING ORDER BY (hotel ASC)
)

CREATE TABLE hotel_location (
  hotel_id int,
  location text,
  latitude float,
  longitude float,
  PRIMARY KEY (hotel_id)
)

CREATE TABLE hotel_bookings (
  booking_id int,
  booked boolean,
  date set<text>,
  PRIMARY KEY ((booking_id, date)) WITH CLUSTERING ORDER BY (date ASC)
)

CREATE TABLE hotel_services (
  hotel_id int,
  service text,
  price set<float>,
  PRIMARY KEY ((hotel_id, service)) WITH CLUSTERING ORDER BY (service ASC)
)

CREATE TABLE hotel_users (
  hotel_id int,
  user_id int,
  bookings set<text>,
  guest boolean,
  PRIMARY KEY ((hotel_id, user_id)) WITH CLUSTERING ORDER BY (user_id ASC)
)

CREATE TABLE user_bookings (
  user_id int,
  booking_id int,
  adults int,
  children int,
  price float,
  PRIMARY KEY ((user_id, booking_id)) WITH CLUSTERING ORDER BY (booking_id ASC)
);

CREATE TABLE user_location (
  user_id int,
  location text,
  latitude float,
  longitude float,
  PRIMARY KEY (user_id)
)

