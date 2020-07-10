## Server API

# Get hotel info
  * GET `/api/calendar/:hotelIdOrName`

**Path Parameters:**
 * `id` hotel id

 **Success Status Code:** `200`

 **Returns:** JSON

 ```json
    {
      "hotel_id": "Number",
      "hotelName": "String",
      "roomsTotal": "Number",
      "maxGuestPerRoom": "Number",
      "bookings": [ {"date": "String", "isBooked": "Boolean"} ],
      "prices": [ {"serviceName": "String", "price": "Number"} ]
    }
```

### Add booking
  * POST `/api/calendar/:hotelIdOrName/booking`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys. (user_id, hotel_id required)

```json
    {
        "user_id": "String",
        "hotel_id": "Number",
        "guests": "Number",
        "checkin": "String",
        "checkout": "String",
        "price": "Number"
    }
```

### Delete booking
  * DELETE `/api/calendar/:hotelIdOrName/user/:userId/booking/:bookingId`

**Success Status Code:** `204`

### Update booking
  * PATCH `/api/calendar/:hotelIdOrName/user/:userId/booking/:bookingId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "hotel_id": "Number",
        "user_id": "Number",
        "booking_id": "Number",
        "checkin": "String",
        "checkout": "String",
        "occupants": "Number",
    }
