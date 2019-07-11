exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataW = require("./../data/w.json");
  const dataWT = dataW.token;
  const dataWL = dataW.lover;
  const dataW_fn = __dirname + "/../data/w.json";
  
  if  (message.member.roles.find("name", "Host") && args[0] !== "") {
    
    async function wfix() {
      
      const keylist = Object.keys(dataWT);
      
      for (var iter in dataWT) {
        if (dataWT.hasOwnProperty(iter)) {
          if (dataWT[iter] != args[0]) {
            let cache = dataWT[iter]
            dataWT[iter] = args[0];
            message.channel.send(message.guild.members.get(iter)+"'s token count has been updated to **"+args[0]+"**. (was "+cache+")");
          } else {
            message.channel.send(message.guild.members.get(iter)+" already have enough tokens.");
          }
        } else {
          message.channel.send(message.guild.members.get(iter)+" is not found.");
        }
      }
      
    }
      
      wfix().then(() => {
        fs.writeFile(dataW_fn, JSON.stringify(dataW, null, 2), function (err) {if (err) return console.log(err);});
      });
  }
}