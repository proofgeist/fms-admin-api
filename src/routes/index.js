import express from "express";
import cloner from "../services/cloner";

const Router = express.Router();

const sendCopy = (res, file, clone, user) => {
  const result = cloner(file, ser, clone);
  res.setHeader(
    "Content-disposition",
    "attachment; filename=" + req.params.file + ".fmp12"
  );
  res.sendFile(result);
};

Router.post("/clone/:file", (req, res) => {
  const clone = true;
  sendCopy(res, req.params.file, clone, req, user);
});

Router.post("/copy/:file", (req, res) => {
  const clone = false;
  sendCopy(res, req.params.file, clone, req, user);
});

export default Router;
