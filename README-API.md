## Server API

# Get hotel info
  * GET `/api/calendar/db/:hotelIdOrName`

**Path Parameters:**
 * `id` hotel id

 **Success Status Code:** `200`

 **Returns:** JSON

 ```json
    {
      "id": "Number",
      "hotelName": "String",
      "roomsTotal": "Number",
      "maxGuestPerRoom": "Number",
      "vacancy": [ {"date": "String", "isBooked": "Boolean"} ],
      "prices": [ {"serviceName": "String", "price": "Number"} ]
    }
```

### Add hotel
  * POST `/api/calendar/db/:hotelIdOrName`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "id": "Number",
        "hotelName": "String",
        "roomsTotal": "Number",
        "maxGuestPerRoom": "Number",
        "vacancy": [ {"date": "String", "isBooked": "Boolean"} ],
        "prices": [ {"serviceName": "String", "price": "Number"} ]
    }
```

### Delete hotel
  * DELETE `/api/calendar/db/:hotelIdOrName`

**Success Status Code:** `204`

### Update hotel
  * POST `/api/calendar/db/:hotelIdOrName`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "id": "Number",
        "hotelName": "String",
        "roomsTotal": "Number",
        "maxGuestPerRoom": "Number",
        "vacancy": [ {"date": "String", "isBooked": "Boolean"} ],
        "prices": [ {"serviceName": "String", "price": "Number"} ]
    }
