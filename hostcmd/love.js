exports.run = (client, message, args) => {
const fs = require('fs');
const data = require("./../data/id.json");
const dataID = data.id;
const dataCH = require("./../data/ch.json");
const dataAT = require("./../data/attri.json");
const muted = dataAT.muted;
const dataW = require("./../data/w.json");
const dataWT = dataW.token;
const dataWL = dataW.lover;
const dataW_fn = __dirname + "/../data/w.json";
  
  
  if (message.member.roles.find("name", "Host") && args[0] !== undefined) {
    
    let user = client.users.get(dataID[args[0]]);
    
    if (user.id === undefined) {
      message.channel.send("Could not find any player by the ID "+args[0]+".");
    } else if (args[1] !== undefined) {
      let love = client.users.get(dataID[args[1]]);
      message.channel.send(`:heart: ${user} and ${love} is now in love with each other!`);
      dataWL[dataID[args[0]]] = dataID[args[1]];
      dataWL[dataID[args[1]]] = dataID[args[0]];
    } else {
      message.channel.send(`:broken_heart: ${user} is loveless!`);
      dataWL[dataID[args[0]]] = '';
    }
    fs.writeFile(dataW_fn, JSON.stringify(dataW, null, 2), function (err) {if (err) return console.log(err);});
  } else {
    message.channel.send("unexpected error...");
  }
}
