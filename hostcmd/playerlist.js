exports.run = (client, message) => {
  const dataPlayer = require.main.require("./data/player.json");
  const $index = require.main.require("./const/index.json");
  let text = "";
  let count = 0;

  for (let i in dataPlayer.userId) {
    text = text + $index.upperAlpha[count]+": "+message.guild.members.get(dataPlayer.userId[i])+", private channel: "+message.guild.channels.get(dataPlayer.channelId[i])+"\n";
    count++;
  }
  message.channel.send(text);
  
}
