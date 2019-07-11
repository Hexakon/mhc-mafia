// ALIAS COMMAND TO .whisper

exports.run = (client, message, args) => {
   try {
    let cmdFile = require(`./whisper.js`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
}