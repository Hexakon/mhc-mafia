exports.run = (client, message, args) => {

  if (message.member.roles.find("name", "Host")) {

    const aliveRole = message.guild.roles.find('name', 'Alive')
    const deadRole = message.guild.roles.find('name', 'Dead')

    message.channel.send("Removing ingame roles...");
    for (let [sf, user] of aliveRole.members) {
      user.removeRole(aliveRole);
      user.setNickname('');
    }
    for (let [sf, user] of deadRole.members) {
      user.removeRole(deadRole);
      user.setNickname('');
    }

  }
}
