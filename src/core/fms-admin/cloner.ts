const fmsadmin = require("./fmsadmin");
const path = require("path");

var temp = require("temp");
temp.track();

export default (file, user, clone) => {
  const cli = fmsadmin(user.name, user.pass);
  const tempDir = temp.mkdirSync("fms-admin-");

  const fmpath = "filewin:/" + tempDir;

  let filePath = "";
  cli.pause(file);
  if (clone) {
    cli.clone(file, fmpath);
    filePath =
      path.resolve(tempDir, "Cloned_by_FMS", "Databases", file) +
      " Clone.fmp12";
  } else {
    cli.backup(file, fmpath);
    filePath = path.resolve(tempDir, "Databases", file) + ".fmp12";
  }
  cli.resume(file);
  return filePath;
};
