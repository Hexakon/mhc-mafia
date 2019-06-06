exports.run = (client, message, args) => {
const data = require("./../playerdata.json");
const dataID = data.id;
const dataPP = data.pp;
  
  if(message.member.roles.find("name", "Host")) {
    if (message.channel.parentID === "459816757536882688") {
    if (args[0].length == 1 && args[0] in dataID) {
      
      let reciU = client.users.get(dataID[args[0]]); // get User object from userid (in dataID)
      let reciN = message.guild.member(reciU).nickname; // get nickname from User object
      
      let text = args.slice(1).join(" "); // message content
      
      message.delete(100);
      
      message.channel.send(":envelope: to **"+reciN+"**: *"+text+"*");
      client.channels.get(dataPP[args[0]]).send(":envelope: special message from a spectator: *"+text+"*");
      client.channels.get("472377082383695882").send(":envelope: **[?] A Spectator** is sending a message to **"+reciN+"**");
      
    } else {
      message.delete(100);
      message.channel.send(":warning: The recipient ID does not exist.").then(msg => {msg.delete(3000)});
    }} else {
      message.delete(100);
      message.channel.send(":warning: You can only send special whispers from the spectator channel!").then(msg => {msg.delete(3000)});
    }
  } else {
    message.delete(100);
    message.channel.send(":warning: This command is for Hosts only!").then(msg => {msg.delete(3000)});
  }
  
}