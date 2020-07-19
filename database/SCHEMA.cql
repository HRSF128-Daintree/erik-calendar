DROP KEYSPACE IF EXISTS hotel;

CREATE KEYSPACE IF NOT EXISTS hotel WITH replication =
{'class' : 'NetworkTopologyStrategy', 'datacenter1' : 3};

CREATE TABLE IF NOT EXISTS hotel.hotels_by_address (
  hotel_id int,
  hotel text,
  address text,
  zipcode text,
  PRIMARY KEY (zipcode, hotel)
  )
  WITH CLUSTERING ORDER BY (hotel ASC)
    AND bloom_filter_fp_chance=0.01;


CREATE TABLE IF NOT EXISTS hotel.bookings_by_guests (
  booking_id int,
  adults int,
  children int,
  checkin text,
  checkout text,
  adult_price int,
  children_price int,
  PRIMARY KEY (booking_id, checkin)
  )
  WITH CLUSTERING ORDER BY (checkin ASC)
    AND bloom_filter_fp_chance=0.01;


CREATE TABLE IF NOT EXISTS hotel.hotel_guests (
  guest_id int,
  email text,
  full_name text,
  phone_number text,
  PRIMARY KEY (guest_id)
  )
  WITH bloom_filter_fp_chance=0.01;
