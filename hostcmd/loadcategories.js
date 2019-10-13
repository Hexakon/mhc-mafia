exports.run = (client, message) => {
  const dataChannel = require.main.require("./data/channel.json");
  const fnChannel = process.cwd() + "/data/channel.json";

  const $function = require.main.require("./const/function.js");

  dataChannel.publicCategory = process.env.PUBCAT
  dataChannel.privateCategory = process.env.PRICAT
  dataChannel.deadCategory = process.env.DEADCAT

  message.channel.send(dataChannel.publicCategory + " " + dataChannel.privateCategory + " " + dataChannel.deadCategory)


  $function.writeFile(fnChannel, dataChannel)
}
