exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $function = require.main.require("./const/function.js");

  message.channel.send(":earth_asia: **ZA WARUDO! TOKI WO TOMARE!**\nTime has been stopped. As of August 24th, you can use the `.initiate nolog` command to start from day 1, and `.time nolog` to fast forward it to any day you want.");
  clearTimeout(dataTime.timeoutID);

}
