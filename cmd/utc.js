exports.run = (client, message, args) => {
  var time = new Date()
  message.channel.send(":clock1: The time is currently **"+time.toUTCString()+"**."); 
}