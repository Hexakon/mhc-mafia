exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataAT = require("./../data/attri.json");
  const dataAT_fn = __dirname + "/../data/attri.json";
  
  if (message.member.roles.find("name", "Host")) {
      async function toggletime () {
        if (dataAT.night == true) {
          dataAT.night = false;
          message.channel.send(":sunny: **The game has now entered Day phase!**");
        } else {
          dataAT.night = true;
          message.channel.send(":crescent_moon: **The game has now entered Night phase!**");
        }
      }
      toggletime().then(() => {
        fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
      });
    }
}