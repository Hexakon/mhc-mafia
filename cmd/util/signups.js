exports.run = (client, message, args) => {
  message.channel.send(":station: There are currently **"+message.guild.roles.find("name", "Passenger").members.size+"** passengers and **"+message.guild.roles.find("name", "Specter").members.size+"** specters.");
}
