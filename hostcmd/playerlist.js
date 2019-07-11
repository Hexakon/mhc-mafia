exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const dataID = data.id
  
  if  (message.member.roles.find("name", "Host")) {
    let list = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let text = "";
    let count = 0;
    for (let i in data.id) {
      text = text + list[count]+": "+message.guild.member(client.users.get(data.id[i]))+", private channel: "+message.guild.channels.get(data.pp[i])+"\n";
      count++;
    }
    message.channel.send(text);
  } else { message.delete(100); message.channel.send(":warning: This command is only for Hosts.").then(msg => {msg.delete(3000)}); }
}