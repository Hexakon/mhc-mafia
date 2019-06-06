exports.run = (client, message, args) => {
const fs = require('fs');
const data = require("./../data/id.json");
const dataID = data.id;
const dataPP = data.pp;
const dataCH = require("./../data/ch.json");
const dataAT = require("./../data/attri.json");
const dataRL = require("./../data/rl.json");
const dataAT_fn = __dirname + "/../data/attri.json";
const muted = dataAT.muted;
  
  if (message.member.roles.find("name", "Alive") && message.author.id == dataID[dataRL.int]) {
    if (message.channel.parentID === dataCH.pricat) {
      async function execute () {
        if (dataAT.exe == true) {
          dataAT.exe = false;
          message.channel.send(":gear: **You have changed your mind.**");
          client.channels.get(dataCH.int).send(":gear: **The Interrogator has changed their mind.**");
        } else {
          dataAT.exe = true;
          message.channel.send(":gear: **You have decided to execute your target.**");
          client.channels.get(dataCH.int).send(":gear: **The Interrogator has decided to execute you.**");
        }
      }
      
      if (dataAT.night == true) {
        execute().then(() => {
          fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
        });
      }
      //message.channel.send(":warning: **You cannot execute on the first night.**");
    }
  }
}