exports.run = (client, message, args) => {
const Discord = require("discord.js");
const helpText = require("./help.json");

  if (args[0] !== undefined) {

    if (helpText[args[0]] !== undefined) {
      let command = helpText[args[0]];
      let redirect = '\u200b';

      if (helpText[args[0]].redirect !== undefined) { // exception if the searched command is an alias
        command = helpText[helpText[args[0]].redirect];
        redirect = "*Redirected from "+args[0].toLowerCase()+"*";
      }

      let description = command.description;
      let usage = command.usage;

      if (command.type === "Interactions") { // unique template for interaction commands.
        description = "Virtually " + command.description + " with anyone and anything, along with a random short message.";
        usage = "`."+command+" <target>`"
      }
      if (command.type === "Self") { // unique template for self commands.
        usage = "`."+command+"`"
      }
      let roles = "";
      if (command.roles !== undefined) { // ingame commands
        roles = "\n\n**Can be used by:** "+command.roles;
      }
      let alias = "";
      if (command.alias !== undefined) { // commands with aliases
        alias = "\n(Alias: "+command.alias+")";
      }

      const helpEmbed = new Discord.RichEmbed()
        .setColor('#11001e')
        .setTitle('**'+command.name+'**')
        .setAuthor('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png', 'http://hex4nova.cf/mafia')
        .setDescription(redirect)
        .addField('*Description*', description+alias)
        .addField('*Usage*', command.usage+roles)
        .setTimestamp()

      message.channel.send(helpEmbed);

    } else {
      message.channel.send(":warning: **The requested command cannot be found.**");
    }


  } else {

    const helpEmbed = new Discord.RichEmbed()
      .setColor('#11001e')
      .setTitle('Command help')
      .setAuthor('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png', 'http://hex4nova.cf/mafia')
      .setDescription('Do `.help <command>` for more information about the command.')
      .addField('*Ingame*', '`.exe` `.i` `.lastwill` `.lw` `.reveal` `.w` `.whisper`')
      .addField('*Documentation*', '`.r` `.rl` `.role` `.roles` `.rolelist`')
      .addField('**Utility**', '`.alert` `.gmt` `.help` `.ping` `.signups` `.utc`')
      .addField('**Interactions**', '`.handshake` `.hit` `.hug` `.slap` `.spray`')
      .addField('**Self**', '`.seize`')
      .addField('**Fun**', '`.8ball` `.catfact` `.coin` `.ligma` `.rps`')
      .setTimestamp()

    message.channel.send(helpEmbed);
  }
}
