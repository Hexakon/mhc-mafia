// ALIAS COMMAND TO .lastwill

exports.run = (client, message, args) => {
   try {
    let cmdFile = require(`./lastwill.js`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
}