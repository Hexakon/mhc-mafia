exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $function = require.main.require("./const/function.js");

  function daybreak () {
    dataTime.dayNo += 1
    dataTime.night = false
    dataTime.nextphase = message.createdTimestamp + dataSetup.dayLength;
  }
  function nightfall () {
    dataTime.night = true
    dataTime.nextphase = message.createdTimestamp + dataSetup.nightLength;
  }


  if (dataTime.night === true) daybreak(); else nightfall();
  message.channel.send((dataTime.night === true) ? ":sunny: **The game has been updated to Day "+dataTime.dayNo+"!**" : ":crescent_moon: **The game has been updated to Night "+dataTime.dayNo+"!**");
  message.channel.send(":tools: This was a manual change of time. Use `.time` to see the length of this period.");

  $function.writeFile(fnTime, dataTime);

  if (args[0].toLowerCase() === "logbook") {
    let displayPhase = (dataTime.night === false) ? "day " : "night ";
    $function.logbook(message, displayPhase + dataTime.dayNo, dataTime.logbookEntries)
  }

}
