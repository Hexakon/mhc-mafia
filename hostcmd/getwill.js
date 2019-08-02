exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataPlayer = require.main.require("./data/player.json");
  const dataWill = require.main.require("./data/lastwill.json");

  let text = dataWill.userId[args[0]];
  if ( text == "" ) {
    message.channel.send("**"+message.guild.members.get(dataPlayer.userId[args[0]]).displayName+"** has not registered any Last Will.");
  } else {
    message.channel.send("**"+message.guild.members.get(dataPlayer.userId[args[0]]).displayName+"**'s Last Will is currently set to:```" + text + "```");
  }
}
