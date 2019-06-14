// ALIAS COMMAND TO .getwill

exports.run = (client, message, args) => {
   try {
    let cmdFile = require(`./getwill.js`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
}
