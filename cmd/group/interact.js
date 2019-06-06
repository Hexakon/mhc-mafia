exports.run = (client, message, args, flavor, error, action) => {
  
  let n = Math.floor(Math.random()*flavor.length)
  
  let s = message.author.username; // sender of the command, set to the sender's username
  
  let t = args.join(" "); // receiver of the command, set to the now safe command arguments
  
  
  if (s.indexOf("@everyone") != -1 || s.indexOf("@here") != -1) {
    message.channel.send("<:ThinkFish:445322352058957835> " + message.author + ", you cannot use this command as you have a mass mention tag in your username.");
  } else if (t.indexOf("@everyone") != -1 || t.indexOf("@here") != -1) {
    message.channel.send("<:ThinkFish:445322352058957835> " + message.author + ", please do not attempt to mass ping through the bot.");
  } else if (t == "") {
    message.channel.send("<:WaitWhat:444042109897539587> **" + s + "** " + error);
  } else {
    message.channel.send(action[0]+" **"+s+"** "+action[1]+" **"+t+"**"+action[2]+"! "+flavor[n]);
  }
}