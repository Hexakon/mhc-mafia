exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  const dataCH = require("./../data/ch.json");
  const dataCH_fn = __dirname + "/../data/ch.json";
  
  let dataID = data.id
  let dataPP = data.pp
  
  const dataST = require("./../data/setup.json");
  const dataST_fn = __dirname + "/../data/setup.json";
  const roletype = require("./../roletype.json");
  
  let old = dataST.rolelist
  dataST.rolelist = args
  message.channel.send("**Role list saved as: **"+dataST.rolelist+"\n\n*Was: "+old+"*");
  fs.writeFile(dataST_fn, JSON.stringify(dataST, null, 2), function (err) {if (err) return console.log(err);});
}
