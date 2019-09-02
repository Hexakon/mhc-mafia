exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $function = require.main.require("./const/function.js");



  (async () => {
    message.channel.send((dataTime.night === true) ? ":sunny: **The game has been manually skipped to Day phase!**" : ":crescent_moon: **The game has been manually skipped to Night phase!**");
    message.channel.send(":tools: This was a manual change of time. Use `.time` to see the length of this period.");
    clearTimeout(dataTime.timeoutID);
  })().then(() => {
    if (args[0] !== "nolog") {
      exports.run = (client, message, args) => {
        try {
          let cmdFile = require.main.require(`./auto/time.js`);
          cmdFile.run(client, message, args);
        } catch (err) {
          console.error(err);
        }
      }
    }

  });
}
