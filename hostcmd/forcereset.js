exports.run = (client, message) => {
  if (message.member === message.guild.owner) {
    process.exit(1);
  } else {
    message.channel.send("no");
  }
}
