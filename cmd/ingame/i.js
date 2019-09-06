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

  if (message.member.roles.find("name", "Alive") && message.channel.parentID === dataChannel.privateCategory && Array.from($function.playersWithRole("medium").values).includes(message.author.id) && dataAT.night === true) {

    for (var e of args) {
      if (e.startsWith("http")) {
        e = "<" + e + ">";
      }
    }

    let text = args.join(" "); // message content

    message.delete(100);
    message.channel.send(":crystal_ball: You: *"+text+"*");
    client.channels.get(dataChannel.dead).send(":crystal_ball: **Medium:** *"+text+"*");
  }
}
