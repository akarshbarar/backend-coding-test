import morganMiddleware from "./middleware/morgon.middleware";
import express from "express";
import bodyParser from 'body-parser';
import morgan from "morgan";
import logger from "./utils/logger";

const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8010;
app.use(morgan("dev"))
app.use(bodyParser.urlencoded());
 app.use(morganMiddleware);
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
  buildSchemas(db);
  const app = require('./src/app')(db);
  
  app.listen(port, () => {
   logger.info(`App started and listening on port ${port}`)
  });
});
