
# Payment Option Backend Coding Test

This Project is regarding savind details of driver and rider along with its staring and end position. The project is some what similar to cab booking application where rider books cab from one location to another location. Then the Rider is assigned a Driver who will drop the rider to his/her destination.

## Installation

Install Paymentoption with npm

```bash
  npm install
  npm run start
```
    
## API Reference

#### Check Health Of App

```http
  GET /health
```

#### Get all Rides

```http
  GET /rides
```


#### Get Rides by id

```http
  GET /rides/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Number` | **Required**. RideId by whitch ride details to fetch |



#### Add Rides

```http
  POST /rides
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `start_lat`      | `Number` | **Required**. Starting Latitude of Rider |
| `start_long`      | `Number` | **Required**.Starting Longitude of Rider|
| `end_lat`      | `Number` | **Required**. Ending Latitude of Rider |
| `end_long`      | `Number` | **Required**. Ending Longitudeof Rider |
| `rider_name`      | `string` | **Required**. Rider Name |
| `driver_name`      | `string` | **Required**. Driver Name|
| `driver_vehicle`      | `string` | **Required**. Driver Vehical Number|

## cURLs for above

To run tests, run the following command

```bash
  curl localhost:8010/health
```

```bash
curl -X POST \
  'localhost:8010/rides' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "start_lat": "70",
  "start_long": "71",
  "end_lat": "72",
  "end_long": "73",
  "rider_name": "AKKI",
  "driver_name": "qwqwqw",
  "driver_vehicle": "sadsf"
}'
```

```bash
curl -X GET \
  'localhost:8010/rides' \
  --header 'Accept: */*' \
````


```bash
curl -X GET \
  'localhost:8010/rides/2' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'
```