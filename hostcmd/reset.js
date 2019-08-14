exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const fnPlayer = process.cwd() + "/data/player.json";
  const dataWill = require.main.require("./data/lastwill.json");
  const fnWill = process.cwd() + "/data/lastwill.json";
  const dataChannel = require.main.require("./data/channel.json");
  const fnChannel = process.cwd() + "/data/channel.json";
  const dataWhisper = require.main.require("./data/whisper.json");
  const fnWhisper = process.cwd() + "/data/whisper.json";

  const roleAlive = message.guild.roles.find('name', 'Alive');
  const roleDead = message.guild.roles.find('name', 'Dead');
  const roleSpec = message.guild.roles.find('name', 'Specter');

  const $function = require.main.require("./const/function.js");
  const $index = require.main.require("./const/index.json");

  if (message.author.id == 132262525818503168 && args[0] == "YESIMSURE") {
    async function resetgame() {

      message.channel.send(":construction: **The game is being reset, please stand by.** :construction:");

      message.channel.send("Clearing player data...");
      for (let i in Object.keys(dataPlayer.userId)) {
        dataPlayer.userId[$index.lowerAlpha[i]] = "";
        dataPlayer.channelId[$index.lowerAlpha[i]] = "";
        dataWill[$index.lowerAlpha[i]] = "";
      }

      message.channel.send("Deleting private channels...");
      client.channels.get(dataChannel.privateCategory).children.forEach((value, key, map) => {value.delete();});

      message.channel.send("Deleting public channels...");
      client.channels.get(dataChannel.publicCategory).children.forEach((value, key, map) => {value.delete();});

      message.channel.send("Deleting afterlife channels...");
      client.channels.get(dataChannel.deadCategory).children.forEach((value, key, map) => {value.delete();});

      message.channel.send("Creating setup channel...");
      let setup_channel = await message.channel.guild.createChannel('※setup', 'text')
      await setup_channel.setParent(dataChannel.publicCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataChannel.setup = setup_channel.id;

      message.channel.send("Creating logbook channel...");
      let logbook_channel = await message.channel.guild.createChannel('※logbook', 'text')
      await logbook_channel.setParent(dataChannel.pubicCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataChannel.logbook = logbook_channel.id;

      message.channel.send("Creating trial channel...");
      let trial_channel = await message.channel.guild.createChannel('※trial', 'text')
      await trial_channel.setParent(dataChannel.publicCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataChannel.trial = trial_channel.id;

      message.channel.send("Creating city-hall channel...");
      let public_channel = await message.channel.guild.createChannel('city-hall', 'text')
      await public_channel.setParent(dataChannel.publicCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
                        channel.overwritePermissions(roleAlive, {SEND_MESSAGES: true});
                       });
      dataChannel.public = public_channel.id;

      message.channel.send("Creating post-office channel...");
      let whisper_channel = await message.channel.guild.createChannel('post-office', 'text')
      await whisper_channel.setParent(dataChannel.publicCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
                        channel.overwritePermissions(roleAlive, {SEND_MESSAGES: true});
                       });
      dataChannel.whisper = whisper_channel.id;

      message.channel.send("Creating graveyard channel...");
      let dead_channel = await message.channel.guild.createChannel('graveyard', 'text')
      await dead_channel.setParent(dataChannel.deadCategory)
      .then(channel => {channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions(roleDead, {VIEW_CHANNEL: true});
                        channel.overwritePermissions(roleSpec, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                       });
      dataChannel.dead = dead_channel.id;

      message.channel.send("Creating spectator channel...");
      let spec_channel = await message.channel.guild.createChannel('ethereal-existence', 'text')
      await spec_channel.setParent(dataChannel.deadcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions(roleSpec, {VIEW_CHANNEL: true});
                       });
      dataChannel.spec = spec_channel.id;
    }

      resetgame().then(() => {
        $function.writeFile(fnPlayer, dataPlayer);
        $function.writeFile(fnWhisper, dataWhisper);
        $function.writeFile(fnChannel, dataChannel);
        message.channel.send("**The game has been reset.**");
      });

  } else {
    message.channel.send(":warning: **Are you sure you want to reset all channels and player data?**\nMake sure you have archived all channels before proceeding!");
  }
}
