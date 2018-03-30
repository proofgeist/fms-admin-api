import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
//import routes from "./routes";
import jsonErrorHandler from "express-json-error-handler";
import * as log from "npmlog";

const errorLog = (err, req, res) => {
  log.error("500", err.err.stack);
};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

//app.use(routes);
app.use(jsonErrorHandler({ log: errorLog }));

export default app;
