exports.run = (client, message, args) => {
const fs = require('fs');
const data = require("./../data/id.json");
const dataID = data.id;
const dataPP = data.pp;
const dataCH = require("./../data/ch.json");
const dataAT = require("./../data/attri.json");
const muted = dataAT.muted;
const dataW = require("./../data/w.json");
let dataWM = dataW.lastmsg;
//const dataWL = dataW.lover; deprecated
const dataW_fn = __dirname + "/../data/w.json";
const dataST = require("./../data/setup.json");


  if((message.member.roles.find("name", "Alive") || message.member.roles.find("name", "Host")) && dataST.w == true) {
    if (message.channel.parentID === "447858869058928642" || message.channel.id === "459817070750728193") {

    args[0] = args[0].toLowerCase();

    if (args[0].length === 1 && args[0] in dataID) {

      let sendN = message.guild.member(message.author).displayName; // get nickname from User object

      let reciU = client.users.get(dataID[args[0]]); // get User object from userid (in dataID)
      let reciN = message.guild.member(reciU).displayName; // get nickname from User object

      for (var i; i < args.length; i++) {
        if (args[i] == "@everyone" || args[i] == "@here") {
          args[i] = "[REDACTED]";
        }
        if (args[i].startsWith("http")) {
          args[i] = "<" + args[i] + ">";
        }
      }

      // Temporary
      //console.log(reciU);

      let text = args.slice(1).join(" "); // message content

      if (text == undefined || text.length < 1) { // detect if message is empty
        message.delete(100);
        message.channel.send(":warning: **You cannot send an empty whisper!**");

      } else if (dataWM[message.author.id] + 3000 > message.createdTimestamp && dataWM[message.author.id] !== undefined) {
        message.channel.send(":stopwatch: **The message was not sent because you are sending whispers too quickly.**").then(msg => {msg.delete(5000)});
        console.log(message.createdTimestamp+", "+ dataWM[message.author.id] + 3000);

      /*} else if (reciU.id == dataWL[message.author.id]) { // LOVER CHANNEL
        message.delete(100);
        message.channel.send(":love_letter: to **"+reciN+"**: *"+text+"*");
        client.channels.get(dataPP[args[0]]).send(":love_letter: from **"+sendN+"**: *"+text+"*");*/

      } else if (message.channel.id == dataCH.mafia) { // MAFIA CHANNEL
        message.delete(100);
        message.channel.send(":envelope: to **"+reciN+"**: *"+text+"*");
        client.channels.get(dataPP[args[0]]).send(":envelope: from **the Mafia**: *"+text+"*");

      } else if (message.channel.id == dataCH.cult) { // CULT CHANNEL
        message.delete(100);
        message.channel.send(":envelope: to **"+reciN+"**: *"+text+"*");
        client.channels.get(dataPP[args[0]]).send(":envelope: from **the Cult**: *"+text+"*");

      } else if (dataAT.night == true) {
        message.channel.send(":warning: **You cannot send whispers at night!**");

      } else if (message.author.id == dataID[dataST.mayor] && dataAT.revealed === true) {
        message.channel.send(":warning: **You cannot whisper when revealed!**");

      } else if (reciU.id == dataID[dataST.mayor] && dataAT.revealed === true) {
        message.channel.send(":warning: **You cannot whisper to the Mayor!**");

      } else if (muted.includes(message.author.id)) {
        message.channel.send(":warning: **You are muted!**");

        // Temporary solution -> dataID[reciN] -> reciU.id
      } else if (message.guild.members.get(reciU.id).roles.find("name", "Dead")) {
        message.channel.send(":warning: **You cannot whisper to a dead player!**");

      } else if (sendN == reciN) {
        message.channel.send(":warning: **You cannot whisper to yourself!**");

      } else {

        message.delete(100);
        message.channel.send(":speech_balloon: to **"+reciN+"**: *"+text+"*");
        client.channels.get(dataPP[args[0]]).send(":speech_balloon: from **"+sendN+"**: *"+text+"*");
        client.channels.get(dataCH.whisper).send(":speech_balloon: **"+sendN+"** is whispering to **"+reciN+"**");

        if (dataST.bm.length != 0) {
          for (var i=0; i < dataST.bm.length; i++) {
            client.channels.get(dataPP[dataST.bm[i]]).send(":eye_in_speech_bubble: **"+sendN+"** ➜ **"+reciN+"**: *"+text+"*");
          }
        }

        dataWM[message.author.id] = message.createdTimestamp;
        fs.writeFile(dataW_fn, JSON.stringify(dataW, null, 2), function (err) {if (err) return console.log(err);});

      }

    } else {
      message.channel.send(":warning: **The recipient ID does not exist!**");
    }
  } else {
      message.delete(100);
      message.channel.send(":warning: **You can only send and receive whispers in your Private Property channel!**");
    }
  } else if (dataST.w === false) {
    message.delete(100);
    message.channel.send(":warning: **Whispers are disabled for this game.**").then(msg => {msg.delete(3000)});
  } else {
    message.delete(100);
    message.channel.send(":warning: **This command is for living players only!**").then(msg => {msg.delete(3000)});
  }
}
