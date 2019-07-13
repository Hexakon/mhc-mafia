exports.run = (client, message, args) => {

  if (args[0] === "role" || args[0] === "r") {
    message.channel.send("`.role` will display basic information of a certain role. Shorthand names are permitted. Do not include spaces for roles whose names are 2 words or longer.\n\n**Usage:** `.role <role name>`\n**Alias:** `.r`");

  } else if (args[0] === "roles" || args[0] === "rolelist" || args[0] === "rl") {
    message.channel.send("`.roles` will fetch a list of all roles under a specific category, and provide additional information about them if requested.\n\n**Usage:**\n`.roles <faction> [category]` to sort the roles by faction and category.\n`.roles <unique/u> [faction]` to see what roles classify as unique.\n`.roles <factional/f>` to see what roles are factional and cannot win with each other.\n`.roles all` to see all roles in a single list.\nAppend `info` to your command to display additional information.\n\n**Alias:** `.rolelist`, `.rl`");

  } else if (args[0] === "whisper" || args[0] === "w") {
    message.channel.send("`.whisper` will send a private message to another player. Whispers are disabled during nighttime, and some roles can hinder the ability to whisper. Whispers become *letters* when sent from the Mafia or the Cult, which bypasses all restrictions. \n\n**Usage:** `.whisper <target player's id> <message>`\n\n**Alias:** `.w`");

  } else if (args[0] === "lastwill" || args[0] === "lw") {
    message.channel.send("`.lastwill` will save a short text to show to all players when you die. Notice that some game mechanics may interfere with this ability.\n\n**Usage:**\n`.lastwill <view/read>` to see your Last Will.\n`.lastwill <rewrite/overwrite> <text>` to overwrite your Last Will with the provided text.\n`.lastwill <write/add> <text>` to add text to your Last Will from a new line.\n`.lastwill <clear/delete>` to delete your Last Will.\n\n**Alias:** `.lw`");

  } else if (args[0] === "alert") {
    message.channel.send("`.alert` will enable or disable notifications for whenever a new game starts. You will not be pinged by this role for any other cause.\n\n**Usage:** `.alert <on/off>`");

  } else if (args[0] === "gmt" || args[0] === "utc") {
    message.channel.send("`.gmt` will output the current time in GMT format, which is the primary timezone for the game.\n\n**Usage:** `.gmt`\n**Alias:** `.utc`");

  } else if (args[0] === "8ball") {
    message.channel.send("`.8ball` will provide a random yes-or-no answer when asked with a question.\n\n**Usage:** `.8ball <question>`");

  } else if (args[0] === "catfact") {
    message.channel.send("`.8ball` will provide a random interesting fact about felines.\n\n**Usage:** `.catfact`");

  } else if (args[0] === "coin") {
    message.channel.send("`.coin` will flip a coin, which randomly lands on either heads or tails.\n\n**Usage:** `.coin`");

  } else if (args[0] === "ligma") {
    message.channel.send("You are currently looking up help for a shitty unfunny joke that people might've found slightly humorous for roughly two days before it was abandoned. Let that sink in. How does it feel to be this pathetic? This command will reinforce just how stupid you are when you use it.\n\n**Usage:** Your intelligence must be somehow even worse than a rock if you don't understand how commands work.");

  } else if (args[0] === "ping") {
    message.channel.send("`.ping` will ping the bot and return the duration it took for the bot to answer. If the bot does not answer other commands, use this to check if the bot is still running normally.\n\n**Usage:** `.ping`");

  } else if (args[0] === "rps") {
    message.channel.send("`.rps` will simulate a game of Rock Paper Scissors against the bot.\n\n**Usage:** `.rps <r/p/s>`");

  } else if (args[0] === "handshake") {
    message.channel.send("`.handshake` allows you to virtually shake hands with anyone and anything, along with a short randomized message.\n\n**Usage:** `.handshake <text/mention>`");
  } else if (args[0] === "hit") {
    message.channel.send("`.hit` allows you to virtually attack anyone and anything, along with a short randomized message.\n\n**Usage:** `.hit <text/mention>`");
  } else if (args[0] === "hug") {
    message.channel.send("`.hug` allows you to virtually hug anyone and anything, along with a short randomized message.\n\n**Usage:** `.hug <text/mention>`");
  } else if (args[0] === "slap") {
    message.channel.send("`.slap` allows you to virtually slap anyone and anything, along with a short randomized message.\n\n**Usage:** `.slap <text/mention>`");
  } else if (args[0] === "spray") {
    message.channel.send("`.spray` allows you to virtually spray some water at anyone and anything, along with a short randomized message.\n\n**Usage:** `.spray <text/mention>`");

  } else if (args[0] === "seize") {
    message.channel.send("`.seize` allows you to virtually announce your socialist beliefs.\n\n**Usage:** `.seize`");


  } else {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#11001e')
      .setTitle('Command help')
      .setAuthor('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png', 'http://hex4nova.cf/mafia')
      .setDescription('Do `.help <command>` for more information about the command.')
      .addField('**Ingame**', '`.lastwill / .lw` - Edit or view your Last Will.\n`.whisper / .w` - Send a private message to a player.')
      .addField('**Documentation**', '`.role / .r` = Get information of a specific role.\n`.roles / .rolelist / .rl` = Get a list of roles by category.')
      .addField('**Utility**', '`.alert` - Toggles notification for new games.\n`.gmt / .utc` - Returns the current time in GMT time.\n`.help` - Display the help message.\n`.ping` - Check if the bot is alive.\n`.signups` - See how many people have signed up or chosen to spectate for the upcoming game.')
      .addField('**Interactions**', '`.handshake` `.hit` `.hug` `.slap` `.spray`')
      .addField('**Self**', '`.seize`')
      .addField('**Fun**', '`.8ball` `.catfact` `.coin` `.ligma` `.ping` `.rps`')

    message.channel.send("```md\n# MHC:M command list```Do `.help <command>` for more information about the command.\n\n**Documentation:**\n`.role / .r` - Get information of a specific role.\n`.roles / .rolelist / .rl` - Get a list of roles by category.\n\n**Ingame:**\n`.lastwill / .lw` - Edit or view your Last Will.\n`.whisper / .w` - Send a private message to a player.\n\n**Utility:**\n`.alert` - Toggles notification for new games.\n`.gmt / .utc` - Returns the current time in GMT time.\n\n**Interactions:** `.handshake`, `.hit`, `.hug`, `.slap`, `.spray`\n\n**Self:** `.seize`\n\n**Fun:** `.8ball`, `.catfact`, `.coin`, `.ligma`, `.ping`, `.rps`");
  }
}
