exports.run = (client, message, args) => {
  const dataSetup = require.main.require("./data/setup.json");
  const fnSetup = process.cwd() + "/data/setup.json";

  const $function = require.main.require("./const/function.js");

  if (args[1] !== undefined) {
    if (typeof dataSetup[args[0]] === undefined) delete dataSetup[args[0]]
    else {
      dataSetup[args[0]] = args[1]

      message.channel.send("`dataSetup."+args[0]+"` has been changed to `"+args[1]+"`.")

      $function.writeFile(fnSetup, dataSetup)
    }

  } else {
    message.channel.send("`dataSetup."+args[0]+"` is currently set to `"+dataSetup[args[0]]+"`.")
  }
}
