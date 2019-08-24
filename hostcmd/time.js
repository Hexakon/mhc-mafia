exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $function = require.main.require("./const/function.js");



  async function toggletime () {
    if (dataTime.night === true) {
      dataTime.night = false;
      message.channel.send(":sunny: **The game has been manually skipped to Day phase!**");
      dataTime.nextphase = message.createdTimestamp() + dataSetup.dayLength;
      message.channel.send(":tools: This was a manual change of time. Daytime is scheduled to end at **" + $function.timeleft(dataTime.nextphase, message.createdTimestamp) + "** from now.");
      clearTimeout(dataTime.timeoutID);
    } else {
      dataTime.night = true;
      message.channel.send(":crescent_moon: **The game has been manually skipped to Night phase!**");
      dataTime.nextphase = message.createdTimestamp() + dataSetup.nightLength;
      message.channel.send(":tools: This was a manual change of time. Nighttime is scheduled to end at **" + $function.timeleft(dataTime.nextphase, message.createdTimestamp) + "** from now.");
      clearTimeout(dataTime.timeoutID);
    }
  }
  toggletime().then(() => {
    $function.writeFile(fnTime, dataTime);

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
