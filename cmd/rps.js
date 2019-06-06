exports.run = (client, message, args) => {
  
  let playerVal;
  let botVal;
  let result;
  
  const field = ["r", "p", "s"];
  const full = {"r":"rock", "p":"paper", "s":"scissors"};
  const wincond = {"r":"s","p":"r","s":"p"};
  
  if (args[0] == "" || args[0] == null || args[0] == "help") {
    message.channel.send("`.rps` simulates a rock-paper-scissors game.\n\n**Usage:**\n`.rps <r/p/s>` to play the corresponding object.");
  } else if (field.includes(args[0])) {
    playerVal = args[0];
    let random = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0)));
    botVal = field[random];
    
    if (playerVal==botVal) {result="The match ended in a tie.";}
    else if (playerVal==wincond[botVal]) {result="You lost the match.";}
    else if (botVal==wincond[playerVal]) {result="You won the match.";}
    
    message.channel.send("You played **" + full[playerVal] + "** and the Bot played **" + full[botVal] + "**. " + result + " " + message.author);
  } else {
    message.channel.send("Unrecognized object! Please use `.rps <r/p/s>` to play. " + message.author);
  }
}