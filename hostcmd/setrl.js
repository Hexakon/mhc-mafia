exports.run = (client, message, args) => {
  const dataSetup = require("./../data/setup.json");
  const fnSetup = process.cwd() + "/data/setup.json";

  const $function = require.main.require("./const/function.js");

  let old = dataSetup.rolelist
  dataSetup.rolelist = args
  message.channel.send("**Role list saved as: **"+dataSetup.rolelist+"\n\n*Was: "+old+"*");
  $function.writeFile(fnSetup, dataSetup)
}
