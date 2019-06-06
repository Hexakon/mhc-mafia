exports.run = (client, message, args) => {
const data = require("./../data/id.json");
const dataID = data.id;
const dataPP = data.pp;
const dataCH = require("./../data/ch.json");
const dataRL = require("./../data/rl.json");
const dataAT = require("./../data/attri.json");
const muted = dataAT.muted;
  
  if (message.member.roles.find("name", "Alive") && message.author.id == dataID[dataRL.int] && message.channel.parentID === dataCH.pricat && dataAT.night === true) {
      
      for (var i; i < args.length; i++) {
        if (args[i] == "@everyone" || args[i] == "@here") {
          args[i] = "@[REDACTED]";
        }
        if (args[i].startsWith("http")) {
          args[i] = "<" + args[i] + ">";
        }
      }
      
      let text = args.join(" "); // message content
      
      message.delete(100);
      message.channel.send(":microphone2: You: *"+text+"*");
      client.channels.get(dataCH.int).send(":microphone2: **Interrogator:** *"+text+"*");
    
  } else {
      for (let i in dataRL.med) {
        if (message.member.roles.find("name", "Alive") && message.channel.parentID === dataCH.pricat && message.author.id == dataID[dataRL.med[i]] && dataAT.night === true) {
          
          for (var e; e < args.length; e++) {
            if (args[e] == "@everyone" || args[e] == "@here") {
            args[e] = "@[REDACTED]";
          }
            if (args[e].startsWith("http")) {
              args[e] = "<" + args[e] + ">";
            }
          }
      
          let text = args.join(" "); // message content
      
          message.delete(100);
          message.channel.send(":crystal_ball: You: *"+text+"*");
          client.channels.get(dataCH.dead).send(":crystal_ball: **Medium:** *"+text+"*");
          
          break;
        }
      }
  }
}