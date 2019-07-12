exports.run = (client, message, args) => {
const fs = require('fs');
const data = require("./../../data/id.json");
const dataID = data.id;
const dataPP = data.pp;
const dataCH = require("./../../data/ch.json");
const dataAT = require("./../../data/attri.json");
const dataST = require("./../../data/setup.json");
const dataAT_fn = __dirname + "/../../data/attri.json";
const muted = dataAT.muted;

  if (message.member.roles.find("name", "Alive") && message.author.id == dataID[dataST.mayor] && message.channel.parentID === dataCH.pubcat && dataAT.revealed === false && dataAT.night === false) {
    async function reveal () {
      dataAT.revealed = true;
      message.channel.send(":loudspeaker: **"+message.author+" has revealed themselves as the Mayor!** <@&442613191139262464>");
    }

    if (dataAT.night == true) {
      reveal().then(() => {
        fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
      })
      .catch(d => console.log(d));
    }
  }
}
