exports.run = (client, message, args) => {
let alertRole = "442709336595234817";
  
  if (args[0] == "on") {
    if (message.member.roles.has(alertRole)) {
      message.channel.send(":checkered_flag: You have already enabled the notification! " + message.author);
    } else {
      message.member.addRole(alertRole).catch(console.error);
      message.channel.send(":checkered_flag: You will now be notified of future games. " + message.author);
    }
  } else if (args[0] == "off") {
    if (message.member.roles.has(alertRole)) {
      message.member.removeRole(alertRole).catch(console.error);
      message.channel.send(":checkered_flag: You will no longer be notified of future games. " + message.author);
    } else {
      message.channel.send(":checkered_flag: You have already disabled the notification! " + message.author);
    }
  } else if (args[0] != null) {
    message.channel.send(":x: Invalid argument! Correct usage: `.alert <on/off>`" + message.author);
  } else {
    message.channel.send("`.alert` will configure new game notifications. When enabled, you will be notified when a game is available.\n\n**Usage:** `.alert <on/off>` to enable or disable notifications accordingly.");
  }
}