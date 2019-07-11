exports.run = (client, message, args) => {
  
  if(message.member.roles.find("name", "Host")) {
    if (args[0] == "everything") {
      args[0] = 100
    }
    message.channel.bulkDelete(args[0], true);
    message.channel.send("Purged **"+args[0]+"** messages.").then(msg => {msg.delete(3000)});
  } else {
    message.delete(100);
    message.channel.send("Oops "+message.author+", this command is for Hosts only~").then(msg => {msg.delete(3000)});
  }
  
}