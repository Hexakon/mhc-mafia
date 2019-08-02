exports.run = (client, message, args) => {
  if (message.member === message.guild.owner) {
    process.exit(1);
  } else {
    message.channel.send("no");
  }
}
