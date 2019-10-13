exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const fnPlayer = process.cwd() + "/data/player.json";
  const dataChannel = require.main.require("./data/channel.json");
  const fnChannel = process.cwd() + "/data/channel.json";
  const dataSetup = require("./../data/setup.json");

  const rolePass = message.guild.roles.find('name', 'Passenger');
  const roleAlive = message.guild.roles.find('name', 'Alive');
  const roleDead = message.guild.roles.find('name', 'Dead');
  const roleSpec = message.guild.roles.find('name', 'Specter');

  const $nicks = require.main.require("./const/nicks.json");
  const $function = require.main.require("./const/function.js");
  const $index = require.main.require("./const/index.json");

  let passengerList = $function.shuffle(rolePass.members.keys()); // shuffled list of snowflakes of every member in rolePass.members
  let nicknames = $function.shuffle($nicks);

  if (message.author.id == 132262525818503168 && args[0] == "YESIMSURE") { // checks if user is Hex4Nova (in case of host power abuse)

    message.channel.send(":construction: **The game is being prepared, please stand by.** :construction:");

    message.channel.guild.createChannel('mafia', 'text')
    .then(channel => {channel.setParent(dataChannel.privateCategory);
                      channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                      channel.overwritePermissions(roleDead, {SEND_MESSAGES: false});
                      channel.overwritePermissions(roleSpec, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                      dataChannel.mafia = channel.id;
                      message.channel.send(`Mafia channel has been set to ${message.guild.channels.get(dataChannel.mafia)}.`);
    });
    message.channel.guild.createChannel('cult', 'text')
    .then(channel => {channel.setParent(dataChannel.privateCategory);
                      channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                      channel.overwritePermissions(roleDead, {SEND_MESSAGES: false});
                      channel.overwritePermissions(roleSpec, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                      dataChannel.cult = channel.id;
                      message.channel.send(`Cult channel has been set to ${message.guild.channels.get(dataChannel.cult)}.`);
    });
    message.channel.guild.createChannel('interrogation_room', 'text')
    .then(channel => {channel.setParent(dataChannel.privateCategory);
                      channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                      channel.overwritePermissions(roleDead, {SEND_MESSAGES: false});
                      channel.overwritePermissions(roleSpec, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                      dataChannel.int = channel.id;
                      message.channel.send(`Interrogation channel has been set to ${message.guild.channels.get(dataChannel.int)}.`);
    });

    (async () => {
      let i = 0;
      let user = "";

      for (let sf of passengerList) { // set "sf" as each member object and loop through the list
        user = rolePass.members.get(sf);

        // in case I forget: for-of loops the first arg (var) through the second arg (obj) and sets the var's value to the current item for the loop. DO NOT use for enumerables (uncountables) such as objects, use for-in instead

        // give roles and generate channels
        await user.addRole(roleAlive);
        await user.removeRole(rolePass);

        // generate player's private property
        let channel = await message.channel.guild.createChannel($index.lowerAlpha[i], 'text');
        await channel.setParent(dataChannel.privateCategory)
        await channel.overwritePermissions(message.guild.id, { // invisible to everyone
          VIEW_CHANNEL: false
        });
        await channel.overwritePermissions(roleSpec.id, { // visible but unchattable to specters
          VIEW_CHANNEL: true,
          SEND_MESSAGES: false
        });
        await channel.overwritePermissions(sf, { // user object
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          MANAGE_MESSAGES: true
        });
        dataPlayer.channelId[$index.lowerAlpha[i]] = channel.id; // save the newly created channel's id in player.json

        // if user doesn't have a nickname, set a random one from nick.json
        if (user.nickname === null) await user.setNickname(nicknames[i]);
        // if user's nickname is too long, cut it at the 26th character
        if (user.nickname != null && user.nickname.length > 32) await user.setNickname(user.nickname.slice(0, 27));
        // sets nickname with letter ID
        await user.setNickname("["+$index.upperAlpha[i]+"] "+user.displayName);

        // assign alphabet as key to snowflake as value
        dataPlayer.userId[$index.lowerAlpha[i]] = sf;

        i++;
      }

      // call for the setup's original role list, shuffle it and store it in the final list to be used.
      let rolelistFinal = $function.shuffle($function.rolegen(dataSetup.rolelist));

      // generate the initial list of players and roles ("user ping = role name" pairs)
      let displaylist = "```";
      for (let [i, userId] of passengerList.entries()) {
      // IN CASE I FORGET: entries() array method returns an array iterable for both index and value

        dataPlayer.role[$index.lowerAlpha[i]] == rolelistFinal[i] // save user role

        let userObject = rolePass.members.get(userId);
        displaylist = displaylist+"\n"+userObject+" = "+rolelistFinal[i]; // add a row of text to displaylist.

      }
      message.channel.send(displaylist+"\n```") // display the list in the same chat
    }).then(() => {
      $function.writeFile(fnPlayer, dataPlayer);
      $function.writeFile(fnChannel, dataChannel);
      message.channel.send("**The game has been set up.**");
    });

  }
}
