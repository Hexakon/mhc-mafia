exports.run = (client, message, args) => {
  var time = new Date().getTime() - message.createdTimestamp
  message.channel.send(":ping_pong: Pong! *(" + time + "ms)* " + message.author); 
}