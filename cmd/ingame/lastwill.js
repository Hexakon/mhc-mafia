exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require(__dirname + "/../../data/id.json");
  const dataLW_fn = __dirname + "/../../data/will.json";
  const dataLW = require(dataLW_fn);
  const dataID = data.id
  let user;

  if  (message.member.roles.find("name", "Alive") || message.member.roles.find("name", "Dead")) {
  if (message.channel.parentID === "447858869058928642") {

    function getKey(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    user = getKey(dataID, message.author.id);

    if (args[0] == "view" || args[0] == "read") {
      if (dataLW[user] == "") {
        message.channel.send("**:warning: You don't have a Last Will.**\nTo write one, use `.lastwill <write/add> <text>`.");
      } else {
        message.channel.send("**:scroll: Your Last Will is currently set to:**```md\n" + dataLW[user] + "```");
      }
    } else if (args[0] == "rewrite" || args[0] == "overwrite") {
      if (args.slice(1).join(" ") == "") {
        message.channel.send("**:warning: You cannot write a Last Will with no content. Please use `.lastwill <clear/delete>` to delete your Last Will.**");
      } else {
        dataLW[user] = args.slice(1).join(" ");
        while (dataLW[user].charAt(0) == "\\" && dataLW[user].charAt(1) == "n") { // remove linebreaks from the start of the string.
          dataLW[user] = dataLW[user].substring(2);
        }
        if (dataLW[user].length > 800) {
          message.channel.send(`**:warning: Your Last Will was not saved because it exceeded 800 characters! (Current length: ${dataLW[user].length} characters)`);
        } else {
          message.channel.send("**:scroll: Your Last Will has been updated to:**```md\n" + dataLW[user] + "```");

          fs.writeFile(dataLW_fn, JSON.stringify(dataLW, null, 2), function (err) {if (err) return console.log(err);});
        }
      }

    } else if (args[0] == "add" || args[0] == "write") {
      if (args.slice(1).join(" ") == "") {
        dataLW[user] = dataLW[user] + "\n";
      } else {
        dataLW[user] = dataLW[user] + "\n" + args.slice(1).join(" ");
        while (dataLW[user].charAt(0) == "\\" && dataLW[user].charAt(1) == "n") { // remove linebreaks from the start of the string.
          dataLW[user] = dataLW[user].substring(2);
        }
      }
      if (dataLW[user].length > 800) {
        message.channel.send(`**:warning: Your Last Will was not saved because it exceeded 800 characters!** (Current length: ${dataLW[user].length} characters)`);
      } else {
        message.channel.send("**:scroll: Your Last Will has been updated to:**```md\n" + dataLW[user] + "```");

        fs.writeFile(dataLW_fn, JSON.stringify(dataLW, null, 2), function (err) {if (err) return console.log(err);});
      }

    } else if (args[0] == "clear" || args[0] == "delete") {

      message.channel.send("**Your Last Will has been deleted.**\nUse the copy below for manual recovery if necessary:```md\n"+dataLW[user]+"```");

      dataLW[user] = "";

      fs.writeFile(dataLW_fn, JSON.stringify(dataLW, null, 2), function (err) {if (err) return console.log(err);});

    } else if (args[0] == "debug") {
      message.channel.send("User ID: "+user);
    } else {
      message.channel.send("`.lastwill <view/read>` to see your Last Will.\n`.lastwill <rewrite/overwrite> <text>` to overwrite your Last Will with the provided text.\n`.lastwill <write/add> <text>` to add text to your Last Will from a new line.\n`.lastwill <clear/delete>` to delete your Last Will.");
    }
  } else { message.delete(100); message.channel.send(":warning: You can only read and write Last Wills in your Private Property channel!").then(msg => {msg.delete(3000)}); }
  } else { message.delete(100); message.channel.send(":warning: This command is only for in-game players.").then(msg => {msg.delete(3000)}); }
}
