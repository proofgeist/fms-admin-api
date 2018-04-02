import cloner from "./cloner";

export default (router: any) => {
  const sendCopy = (res, file, clone, user) => {
    const result = cloner(file, user, clone);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=" + file + ".fmp12"
    );
    res.sendFile(result);
  };

  router.post("/clone/:file", (req, res) => {
    const clone = true;
    sendCopy(res, req.params.file, clone, req.user);
  });

  router.post("/copy/:file", (req, res) => {
    const clone = false;
    sendCopy(res, req.params.file, clone, req.user);
  });

  router.get("/test", (req, res) => {
    res.send("ok");
  });

  return { Router: router };
};
