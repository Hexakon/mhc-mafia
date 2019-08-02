exports.run = (client, message, args) => {
  var time = new Date()

  args[0] = (args[0] === "everything") ? 100 : args[0];

  message.channel.bulkDelete(args[0], true);
  message.author.send("Purged **"+args[0]+"** messages in "+message.channel+" on "+time.toUTCString()+".")

}
