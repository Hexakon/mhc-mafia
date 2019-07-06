exports.run = (client, message, args) => {

  if (message.member.roles.find("name", "Host")) {

    const data = require("./../data/id.json");
    const data_fn = __dirname + "/../data/id.json";

    // get data type from the first argument ("id", "pp", "rl")
    let dataPATH = data[args[0]];

    // get letter from the second argument (a-z)
    dataPATH = dataPATH[args[1]];

    // modify data if there is a third argument, otherwise display current data
    if (args[2] !== undefined) {
      dataPATH = args[2];

      message.channel.send("`data."+args[0]+"."+args[1]+"` has been changed to `"+args[2]+"`.")

      fs.writeFile(data_fn, JSON.stringify(data, null, 2), function (err) {if (err) return console.log(err);});
    } else {
      message.channel.send("`data."+args[0]+"."+args[1]+"` is currently set to `"+args[2]+"`.")
    }

  }
}
