exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $function = require.main.require("./const/function.js");



  async function toggletime () {
    if (dataTime.night === true) {
      dataTime.night = false;
      message.channel.send(":sunny: **The game has now entered Day phase!**");
      dataTime.nextphase = message.createdTimestamp() + dataSetup.dayLength;
      message.channel.send(":tools: This was a manual change of time. Daytime is scheduled to end at **" + $function.timeleft(dataTime.nextphase, message.createdTimestamp) + "** from now.");
      client.user.setPresence({ game: { name: 'INGAME: Daytime' }, status: 'online' })
    } else {
      dataAT.night = true;
      dataAT.exe = false;
      message.channel.send(":crescent_moon: **The game has now entered Night phase!**");
      dataAT.nextphase = message.createdTimestamp() + dataST.nightLength;
      message.channel.send(":tools: This was a manual change of time. Nighttime is scheduled to end at **" + $function.timeleft(dataTime.nextphase, message.createdTimestamp) + "** from now.");
      client.user.setPresence({ game: { name: 'INGAME: Nighttime' }, status: 'idle' })
    }
  }
  toggletime().then(() => {
    $function.writeFile(fnTime, dataTime);
  });
}
