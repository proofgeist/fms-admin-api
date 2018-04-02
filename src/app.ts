import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { LoadCore } from "./core";
import jsonErrorHandler from "express-json-error-handler";
import * as log from "npmlog";

const errorLog = (err, req, res) => {
  log.error("500", err.err.stack);
};

const app = express();
app.set("log", log);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appLoader = async () => {
  await LoadCore(app);

  app.use(jsonErrorHandler({ log: errorLog }));
  return app;
};

export default appLoader;
