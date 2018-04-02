import * as express from "express";
import { lstatSync, readdirSync } from "fs";
import { join, parse } from "path";
let Router = express.Router();

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
    .map(path => {
      return parse(path).name;
    });

export const LoadCore = async app => {
  const log = app.get("log");
  const plugins = getDirectories("./src/core");
  plugins.forEach(async pluginPath => {
    try {
      const loader = (await import("../core/" + pluginPath)).default;
      const plugin = loader(Router, app);
      app.use("/" + pluginPath, plugin.Router);
      log.info("plugin", pluginPath + " loaded");
    } catch (e) {
      log.error("plugin " + pluginPath, "failed to load", e);
    }
  });
};
