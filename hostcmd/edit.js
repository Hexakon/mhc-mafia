exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataPlayer = require.main.require("./data/player.json");
  const fnPlayer = process.cwd() + "/data/player.json";

    // modify data if there is a third argument, otherwise display current data
    if (args[2] !== undefined) {
      data[args[0]][args[1]] = args[2];

      message.channel.send("`data."+args[0]+"."+args[1]+"` has been changed to `"+args[2]+"`.")

      fs.writeFile(fnPlayer, JSON.stringify(dataPlayer, null, 2), function (err) {if (err) return console.log(err);});
      
    } else {
      message.channel.send("`data."+args[0]+"."+args[1]+"` is currently set to `"+data[args[0]][args[1]]+"`.")
    }

  }
}
