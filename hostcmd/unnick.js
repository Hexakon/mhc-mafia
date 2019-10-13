exports.run = (client, message) => {

  const aliveRole = message.guild.roles.find('name', 'Alive')
  const deadRole = message.guild.roles.find('name', 'Dead')

  message.channel.send("Removing ingame roles...");
  (async () => {
    for (let [sf, user] of aliveRole.members) {
      await user.removeRole(aliveRole);
      await user.setNickname('');
    }
    for (let [sf, user] of deadRole.members) {
      await user.removeRole(deadRole);
      await user.setNickname('');
    }
  })();

}
