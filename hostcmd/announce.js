exports.run = (client, message, args) => {
  
  if(message.member.roles.find("name", "Host")) {
    let text = args.join(" ");
    message.delete(100);
    message.channel.send(text);
  } else {
    message.delete(100);
    message.channel.send("Oops "+message.author+", this command is for Hosts only~").then(msg => {msg.delete(3000)});
  }
  
}