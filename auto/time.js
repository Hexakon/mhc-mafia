exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataChannel = require.main.require("./data/channel.json");
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  //const $lang = require.main.require("./const/lang.json");
  const $function = require.main.require("./const/function.js");


  async function daybreak () {
    dataTime.dayNo += 1
    dataTime.night = false
  }
  async function nightfall () {
    dataTime.night = true
  }

  async function toggletime () {
    if (dataTime.night === false) {
      await daybreak()
      dataTime.timeoutID = setTimeout(toggletime, dataSetup.dayLength)
    } else {
      await nightfall()
      dataTime.timeoutID = setTimeout(toggletime, dataSetup.nightLength)
    }
  }

  toggletime().then(() => {
    let displayPhase = (dataTime.night === false) ? "day " : "night "
    message.guild.channels.get(dataChannel.logbook).send($function.logbook(displayPhase + dataTime.dayNo, dataTime.logbookEntries))
    dataTime.logbookEntries = []
    $function.writeFile(fnTime, dataTime);
  });
}
