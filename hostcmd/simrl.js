exports.run = (client, message, args) => {
  const $function = require.main.require("./const/function.js");

  message.channel.send($function.shuffle($function.rolegen(args)))
}
