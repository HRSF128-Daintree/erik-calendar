## Server API

# Get hotel info
  * GET `/api/hotel/:hotelIdOrName/calendar`

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
      "dates": "[ "String" ]",
    }
```

### Add booking
  * POST `/api/hotel/:hotelIdOrName/calendar/booking`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys. (user_id, hotel_id required)

```json
    {
        "user_id": "Number",
        "hotel_id": "Number",
        "room_id": "Number",
        "guests": "Number",
        "rooms": "Number",
        "checkin": "String",
        "checkout": "String",
        "service": "String",
    }
```

### Delete booking
  * DELETE `/api/hotel/:hotelIdOrName/calendar/user/:userId/booking/:bookingId`

**Success Status Code:** `204`

### Update booking
  * PATCH `/api/hotel/:hotelIdOrName/calendar/user/:userId/booking/:bookingId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "hotel_id": "Number",
        "user_id": "Number",
        "room_id": "Number",
        "rooms": "Number",
        "checkin": "String",
        "checkout": "String",
        "occupants": "Number",
    }
