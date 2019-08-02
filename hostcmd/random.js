exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const $function = require.main.require("./const/function.js");

  let item = $function.shuffle(Object.keys(dataPlayer.userId))
  item = data.id[item[0]];

  message.channel.send(":game_die: I choose... **"+message.guild.members.get(item)+"**");

}
