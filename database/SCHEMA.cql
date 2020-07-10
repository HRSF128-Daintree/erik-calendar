CREATE TABLE hotels_by_address {
  address text,
  hotel_id int,
  hotel text,
  PRIMARY KEY ((hotel_id, hotel)) WITH CLUSTERING ORDER BY (hotel ASC)
}

CREATE TABLE available_hotel_rooms (
  hotel_id int,
  address text,
  rooms int,
  room_id int,
  checkin text,
  checkout text,
  PRIMARY KEY ((hotel_id, room_id, rooms)) WITH CLUSTERING ORDER BY (room_id, rooms ASC)
)


CREATE TABLE bookings_by_guests (
  hotel_id int,
  guest_id int,
  room_id int,
  service text,
  adults int,
  children int,
  checkin text,
  checkout text,
  price float,
  confirm_num uuid,
  PRIMARY KEY ((hotel_id, guest_id, service)) WITH CLUSTERING ORDER BY (guest_id, room_id ASC)
)

CREATE TABLE bookings_by_rooms (
  hotel_id int,
  room_id int,
  rooms int,
  service, text,
  checkin text,
  checkout text,
  price float,
  confirm_num uuid,
  PRIMARY KEY ((hotel_id, room_id, rooms)) WITH CLUSTERING ORDER BY (room_id, rooms ASC)
)

CREATE TABLE bookings_by_date (
  hotel_id int,
  room_id int,
  guest_id int,
  rooms int,
  service text,
  checkin text,
  checkout text,
  price float,
  confirm_num uuid,
  PRIMARY KEY ((hotel_id, checkin, checkout)) WITH CLUSTERING ORDER BY (checkin, checkout ASC)
)

CREATE TABLE bookings_by_price (
  hotel_id int,
  room_id int,
  guest_id int,
  rooms int,
  service text,
  checkin text,
  checkout text,
  price float,
  confirm_num uuid,
  PRIMARY KEY ((hotel_id, price)) WITH CLUSTERING ORDER BY (price ASC)
)

CREATE TABLE hotel_guests (
  hotel_id int,
  guest_id int,
  bookings set<text>,
  email text,
  first_name text,
  last_name text,
  phone_number text,
  address text,
  PRIMARY KEY ((hotel_id, guest_id)) WITH CLUSTERING ORDER BY (guest_id ASC)
)
