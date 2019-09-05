exports.run = (client, message, args) => {
const dataPlayer = require.main.require("./../../data/player.json");
const dataChannel = require.main.require("./data/ch.json");
const dataSetup = require.main.require("./data/setup.json");
const dataTime = require.main.require("./data/time.json");

const $function = require.main.require("./const/function.js");

  /*if (message.member.roles.find("name", "Alive") && $function.playersWithRole("interrogator") && message.channel.parentID === dataChannel.privateCategory && dataTime.night === true) {

      for (var i; i < args.length; i++) {
        if (args[i].startsWith("http")) {
          args[i] = "<" + args[i] + ">";
        }
      }

      let text = args.join(" "); // message content

      message.delete(100);
      message.channel.send(":microphone2: You: *"+text+"*");
      message.guild.channels.get(dataChannel.int).send(":microphone2: **Interrogator:** *"+text+"*");

  } else {*/

  for (let alphaId in $function.playersWithRole("medium")) {
    if (message.member.roles.find("name", "Alive") && message.channel.parentID === dataChannel.privateCategory && dataPlayer.playerId[alphaId] === message.author.id && dataAT.night === true) {

      for (var e; e < args.length; e++) {
        if (args[e].startsWith("http")) {
          args[e] = "<" + args[e] + ">";
        }
      }

      let text = args.join(" "); // message content

      message.delete(100);
      message.channel.send(":crystal_ball: You: *"+text+"*");
      client.channels.get(dataChannel.dead).send(":crystal_ball: **Medium:** *"+text+"*");

      break;
    }
  }
}
