exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  const dataAT = require("./../data/attri.json");
  const dataAT_fn = __dirname + "/../data/attri.json";
  const dataCH = require("./../data/ch.json");
  let dataID = data.id
  let dataPP = data.pp
  let muted = dataAT.muted
  
  async function mute () {
    
    let player = dataID[args[0]];
    await muted.push(player);
    
    await client.channels.get(dataCH.public).overwritePermissions(player, {SEND_MESSAGES: false});
    await client.channels.get(dataCH.whisper).overwritePermissions(player, {SEND_MESSAGES: false});
    
    message.channel.send(`:mute: ${message.guild.members.get(player)} is now muted.`);
  }
  async function unmute () {
    
    let player = dataID[args[0]];
    let index = muted.indexOf(player.id);
    await muted.splice(index, 1);
    
    await client.channels.get(dataCH.public).permissionOverwrites.get(player).delete();
    await client.channels.get(dataCH.whisper).permissionOverwrites.get(player).delete();
    
    message.channel.send(`:sound: ${message.guild.members.get(player)} is now unmuted.`);
  }
  
  if  (message.member.roles.find("name", "Host")) {
    if (dataAT.muted.includes(dataID[args[0]]) && args[0].length == 1) {
      unmute().then(() => {
        fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
      });
    } else if (args[0].length == 1) {
      mute().then(() => {
        fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
      });
    } else {
      message.channel.send(":warning: **Invalid syntax!**");
    }
  }
}