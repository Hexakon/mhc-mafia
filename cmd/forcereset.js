exports.run = (client, message, args) => {
  if (message.member.roles.find("name", "Host") && message.author.id == 132262525818503168) {
    process.exit(1);
  } else {
    message.channel.send("no");
  }
}