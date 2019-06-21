exports.run = (client, message, args) => {

  if (message.member.roles.find("name", "Host")) {
  
    const aliveList = message.guild.roles.find('name', 'Alive').members;
    const deadList = message.guild.roles.find('name', 'Dead').members;

    message.channel.send("Removing ingame roles...");
    for (let [sf, user] of aliveList) {
      user.removeRole('442613191139262464');
      user.setNickname('');
    }
    for (let [sf, user] of deadList) {
      user.removeRole('442613265676107776');
      user.setNickname('');
    }

  }
}
