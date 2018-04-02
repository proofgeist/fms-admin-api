import { Router, Application } from "express";

export default (router: Router, app: Application) => {
  const log = app.get("log");

  router.get("/ping", (req, res) => {
    res.send("pong");
  });

  router.get("/stop", (req, res) => {
    res.send("restarting");
    setTimeout(() => {
      log.info("plugin app-control", "stoping server");
      process.exit(1);
    }, 500);
  });

  return { Router: router };
};
