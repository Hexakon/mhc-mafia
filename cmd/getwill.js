exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const dataLW = require(__dirname + "/../data/will.json");
  const dataID = data.id
  
  if  (message.member.roles.find("name", "Host")) {
    let text = dataLW[args[0]];
    if ( text == "" ) {
      message.channel.send("**"+message.guild.member(client.users.get(dataID[args[0]])).displayName+"** has not registered any Last Will.");
    } else {
      message.channel.send("**"+message.guild.member(client.users.get(dataID[args[0]])).displayName+"**'s Last Will is currently set to:```" + text + "```");
    }
  } else { message.delete(100); message.channel.send(":warning: This command is only for Hosts.").then(msg => {msg.delete(3000)}); }
}