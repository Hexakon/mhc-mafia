exports.run = (client, message, args) => {

  // THIS COMMAND DOES NOT WORK YET DUE TO MANUAL/AUTOMATIC BRANCH VERSION DIFFERENCES, AND SHOULD NOT BE USED.

  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";
  const dataSetup = require.main.require("./data/setup.json");

  const roleAlive = message.guild.roles.find('name', 'Alive');
  const roleDead = message.guild.roles.find('name', 'Dead');
  const roleSpec = message.guild.roles.find('name', 'Specter');

  const $function = require.main.require("./const/function.js");
  const $index = require.main.require("./const/index.json");

  dataTime.gamestate = 3
  dataTime.dayNo = 1
  dataTime.night = false
  dataTime.nextphase = message.createdTimestamp + dataSetup.dayLength

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
}
