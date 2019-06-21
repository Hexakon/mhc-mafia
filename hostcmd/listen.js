// UNFINISHED - This is supposed to listen and post a message whenever someone reacts to the trial like in TOS, but I can't figure out how to detect when someone unreacts. Will get back to this later maybe

exports.run = (client, message, args) => {
  const data = require("./../data/id.json");
  const dataCH = require("./../data/ch.json");
  const indicators = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];
  const aliveList = message.guild.roles.find('name','Alive').members;

  if (args[0] == undefined) {
    message.channel.send(":warning: **Unknown message ID!**");
  } else {
    let trial = message.guild.channels.get(dataCH.trial).fetchMessage(args[0]);

    const filter = (reaction, user) => indicators.include(reaction.emoji.name) && message.guild.members.get(user.id).roles.find("name", "Alive")

    const collector = message.createReactionCollector(filter, { time: 43200000 });

    collector.on('collect', (reaction, reactionCollector) => {
	    console.log(`Collected ${reaction.emoji.name}`);
    });

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
    });

  }
}
