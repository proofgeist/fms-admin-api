//handle ENV
import * as https from "https";
import * as fs from "fs";
import * as dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  process.env.NODE_ENV = "development";
  const dotenv = require("dotenv");
  dotenv.config();
} else {
  process.env.PORT = "80";
}
if (!process.env.PORT) {
  process.env.PORT = "3030";
}
import * as log from "npmlog";
import loadApp from "./app";

//handle the unhandled and the uncaught
process.on("unhandledRejection", (err, promise) => {
  log.error("", "Unhandled Rejection at " + promise, err);
});

process.on("uncaughtException", err => {
  log.error("", "Uncaught Exception: " + err.message, err);
  process.exit(1);
});

const handleListen = err => {
  if (err) return log.error("", "error on startup", err);

  const message = `listening in ${process.env.NODE_ENV} mode on port ${
    process.env.PORT
  }`;

  log.info("server", message);
};

loadApp().then(app => {
  if (process.env.NODE_ENV === "production") {
    const options = {
      key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.SSL_CERTIFICATE)
    };
    const sslapp = https.createServer(options, app);
    sslapp.listen(process.env.PORT, handleListen);
  } else {
    app.listen(process.env.PORT, handleListen);
  }
});
