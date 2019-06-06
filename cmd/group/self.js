exports.run = (client, message, args, flavor, action) => {
  
  let n = Math.floor(Math.random()*flavor.length)
  
  let s = message.author.username; // sender of the command, set to the sender's username
  
  if (s.indexOf("@everyone") != -1 || s.indexOf("@here") != -1) {
    message.channel.send("<:ThinkFish:445322352058957835> " + message.author + ", you cannot use this command as you have a mass mention tag in your username.");
  } else {
    message.channel.send(action[0]+" **"+s+"** "+action[1]+" "+flavor[n]);
  }
}