// ALIAS COMMAND TO .utc

exports.run = (client, message, args) => {
   try {
    let cmdFile = require(`./utc.js`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
}