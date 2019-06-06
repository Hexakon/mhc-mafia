exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  const dataCH = require("./../data/ch.json");
  const dataCH_fn = __dirname + "/../data/ch.json";
  
  let dataID = data.id
  let dataPP = data.pp
  
  const dataRL = require("./../data/rl.json");
  const dataRL_fn = __dirname + "/../data/rl.json";
  const roletype = require("./../roletype.json");
  
  let old = dataRL.rolelist
  dataRL.rolelist = args
  message.channel.send("**Role list saved as: **"+dataRL.rolelist+"\n\n*Was: "+old+"*");
  fs.writeFile(dataRL_fn, JSON.stringify(dataRL, null, 2), function (err) {if (err) return console.log(err);});
}