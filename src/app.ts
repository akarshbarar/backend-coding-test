import { Request, Response } from "express";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

module.exports = (db:any) => {
  app.get('/health', (req:Request, res:Response) => res.send('Healthy'));

  app.post('/rides', jsonParser, async (req:Request, res:Response) => {
    try {
      const {
        start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle
      } = req.body;

      const startLatitude = Number(start_lat);
      const startLongitude = Number(start_long);
      const endLatitude = Number(end_lat);
      const endLongitude = Number(end_long);
      const riderName = rider_name;
      const driverName = driver_name;
      const driverVehicle = driver_vehicle;

      if (startLatitude < -90
          || startLatitude > 90
          || startLongitude < -180
          || startLongitude > 180) {
        return res.send({
          error_code: 'VALIDATION_ERROR',
          message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        });
      }

      if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        return res.send({
          error_code: 'VALIDATION_ERROR',
          message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        });
      }

      if (typeof riderName !== 'string' || riderName.length < 1) {
        return res.send({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string'
        });
      }

      if (typeof driverName !== 'string' || driverName.length < 1) {
        return res.send({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string'
        });
      }

      if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        return res.send({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string'
        });
      }

      const values = [
        start_lat,
        start_long,
        end_lat,
        end_long,
        rider_name,
        driver_name,
        driver_vehicle
      ];

        const result = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
        const rows = await db.run('SELECT * FROM Ride');
        console.log(rows)
        return res.send(rows);
      // const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err:any) {
      //   if (err) {
      //     return res.send({
      //       error_code: 'SERVER_ERROR',
      //       message: 'Unknown error'
      //     });
      //   }
      //   db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (err:any, rows:any) => {
      //     if (err) {
      //       return res.send({
      //         error_code: 'SERVER_ERROR',
      //         message: 'Unknown error'
      //       });
      //     }

      //     res.send(rows);
      //   });
      // });
    } catch (error) {
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
      });
    }
  });

  app.get('/rides', (req:Request, res:Response) => {
    db.all('SELECT * FROM Rides', (err:any, rows:any) => {
      if (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        });
      }

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      res.send(rows);
    });
  });

  app.get('/rides/:id', (req: Request, res: Response) => {
    db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err:any, rows:any) => {
      if (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        });
      }

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      res.send(rows);
    });
  });

  return app;
};
