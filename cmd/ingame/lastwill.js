exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const dataWill = require.main.require("./data/lastwill.json");
  const fnWill = process.cwd() + "/data/will.json";

  const $function = require.main.require("./const/function.js");

  if (message.member.roles.find("name", "Alive") || message.member.roles.find("name", "Dead")) {
  if (message.channel.parentID === "447858869058928642") {

    let user = Object.keys(dataPlayer).find(key => dataPlayer[key] === message.author.id);

    if (args[0] == "view" || args[0] == "read") {
      if (dataWill[user] == "") {
        message.channel.send("**:warning: You don't have a Last Will.**\nTo write one, use `.lastwill <write/add> <text>`.");
      } else {
        message.channel.send("**:scroll: Your Last Will is currently set to:**```md\n" + dataWill[user] + "```");
      }
    } else if (args[0] == "rewrite" || args[0] == "overwrite") {
      if (args.slice(1).join(" ") == "") {
        message.channel.send("**:warning: You cannot write a Last Will with no content. Please use `.lastwill <clear/delete>` to delete your Last Will.**");
      } else {
        dataWill[user] = args.slice(1).join(" ");
        while (dataWill[user].charAt(0) == "\\" && dataWill[user].charAt(1) == "n") { // remove linebreaks from the start of the string.
          dataWill[user] = dataWill[user].substring(2);
        }
        if (dataWill[user].length > 800) {
          message.channel.send(`**:warning: Your Last Will was not saved because it exceeded 800 characters! (Current length: ${dataWill[user].length} characters)`);
        } else {
          message.channel.send("**:scroll: Your Last Will has been updated to:**```md\n" + dataWill[user] + "```");

          $function.writeFile(fnWill, dataWill)
        }
      }

    } else if (args[0] == "add" || args[0] == "write") {
      if (args.slice(1).join(" ") == "") {
        dataWill[user] = dataWill[user] + "\n";
      } else {
        dataWill[user] = dataWill[user] + "\n" + args.slice(1).join(" ");
        while (dataWill[user].charAt(0) == "\\" && dataWill[user].charAt(1) == "n") { // remove linebreaks from the start of the string.
          dataWill[user] = dataWill[user].substring(2);
        }
      }
      if (dataWill[user].length > 800) {
        message.channel.send(`**:warning: Your Last Will was not saved because it exceeded 800 characters!** (Current length: ${dataWill[user].length} characters)`);
      } else {
        message.channel.send("**:scroll: Your Last Will has been updated to:**```md\n" + dataWill[user] + "```");

        $function.writeFile(fnWill, dataWill)
      }

    } else if (args[0] == "clear" || args[0] == "delete") {

      message.channel.send("**Your Last Will has been deleted.**\nUse the copy below for manual recovery if necessary:```md\n"+dataWill[user]+"```");

      dataWill[user] = "";

      $function.writeFile(fnWill, dataWill)

    } else if (args[0] == "debug") {
      message.channel.send("User ID: "+user);
    } else {
      message.channel.send("`.lastwill <view/read>` to see your Last Will.\n`.lastwill <rewrite/overwrite> <text>` to overwrite your Last Will with the provided text.\n`.lastwill <write/add> <text>` to add text to your Last Will from a new line.\n`.lastwill <clear/delete>` to delete your Last Will.");
    }
  } else { message.delete(100); message.channel.send(":warning: You can only read and write Last Wills in your Private Property channel!").then(msg => {msg.delete(3000)}); }
  } else { message.delete(100); message.channel.send(":warning: This command is only for in-game players.").then(msg => {msg.delete(3000)}); }
}
