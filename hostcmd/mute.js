exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const fnPlayer = process.cwd() + "/data/id.json";
  const dataEffect = require.main.require("./data/effect.json");
  const fnEffect = process.cwd() + "/data/effect.json";
  const dataChannel = require.main.require("./data/channel.json");
  const $function = require.main.require("./const/function.js");

  async function mute () {

    let player = dataPlayer.userId[args[0]];
    await dataEffect.muted.push(player); // adds player to the muted effect list

    await client.channels.get(dataChannel.public).overwritePermissions(player, {SEND_MESSAGES: false});
    await client.channels.get(dataChannel.whisper).overwritePermissions(player, {SEND_MESSAGES: false});

    message.channel.send(`:mute: ${message.guild.members.get(player)} is now muted.`);
  }
  async function unmute () {

    let player = dataPlayer.userId[args[0]];
    let index = dataEffect.muted.indexOf(player.id);
    await dataEffect.muted.splice(index, 1);

    await client.channels.get(dataChannel.public).permissionOverwrites.get(player).delete();
    await client.channels.get(dataChannel.whisper).permissionOverwrites.get(player).delete();

    message.channel.send(`:sound: ${message.guild.members.get(player)} is now unmuted.`);
  }

  if (dataEffect.muted.includes(dataPlayer.userId[args[0]]) && args[0].length == 1) {
    unmute().then(() => {
      $function.writeFile(fnEffect, dataEffect)
    });
  } else if (args[0].length == 1) {
    mute().then(() => {
      $function.writeFile(fnEffect, dataEffect)
    });
  } else {
    message.channel.send(":warning: **Invalid syntax!**");
  }
}
