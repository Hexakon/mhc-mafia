exports.run = (client, message) => {
    const dataChannel = require.main.require("./data/channel.json");
    const dataSetup = require.main.require("./data/setup.json");
    const dataTime = require.main.require("./data/time.json");
    const fnTime = process.cwd() + "/data/time.json";
  
    //const $lang = require.main.require("./const/lang.json");
    const $function = require.main.require("./const/function.js");
  
    dataTime.night = true
    dataTime.nextphase = message.createdTimestamp + dataSetup.nightLength;
  
    let displayPhase = (dataTime.night === false) ? "day " : "night "
    message.guild.channels.get(dataChannel.logbook).send($function.logbook(displayPhase + dataTime.dayNo, dataTime.logbookEntries))
    dataTime.logbookEntries = []
    $function.writeFile(fnTime, dataTime);
  }