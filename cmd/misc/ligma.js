exports.run = (client, message, args) => {
  message.author.send("http://gph.is/1oqfHBs");
  message.delete(100);
  message.channel.send("Ah fuck I can't believe you've done this " + message.author).then(msg => {msg.delete(1000)});
}