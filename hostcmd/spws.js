exports.run = (client, message, args) => {
const dataPlayer = require("./data/player.json");
const dataChannel = require("./data/channel.json")

  if (message.channel.parentID === dataChannel.deadCategory) {
    if (args[0].length == 1 && args[0] in dataPlayer.userId) {

      let reciU = client.users.get(dataPlayer.userId[args[0]]); // get User object from userid (in dataID)
      let reciN = message.guild.member(reciU).nickname; // get nickname from User object

      let text = args.slice(1).join(" "); // message content

      message.delete(100);

      message.channel.send(":envelope: to **"+reciN+"**: *"+text+"*");
      client.channels.get(dataPlayer.channelId[args[0]]).send(":envelope: Message from a spectator: *"+text+"*");
      client.channels.get(dataChannel.whisper).send(":envelope: **[?] A Spectator** is sending a message to **"+reciN+"**");

    } else {
      message.delete(100);
      message.channel.send(":warning: The recipient ID does not exist.").then(msg => {msg.delete(3000)});
    }
  }

}
