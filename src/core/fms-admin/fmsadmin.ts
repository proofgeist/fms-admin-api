const execSync = require("child_process").execSync;
module.exports = (user, pass) => {
  const run = command => {
    const s = `"C:\\Program Files\\FileMaker\\FileMaker Server\\Database Server\\fmsadmin" -u${user} -p${pass} ${command}`;
    console.log(command);
    return execSync(s).toString();
  };
  return {
    pause: db => {
      run(`PAUSE ${db} --yes`);
    },
    close: db => {
      run(`CLOSE ${db} --yes`);
    },
    open: db => {
      run(`OPEN ${db}`);
    },
    resume: db => {
      run(`Resume ${db}`);
    },
    backup: (db, dest) => {
      run(`backup ${db} -k0 --dest ${dest}`);
    },
    clone: (db, dest) => {
      run(`backup ${db} -k0 --dest ${dest} --clone`);
    }
  };
};
