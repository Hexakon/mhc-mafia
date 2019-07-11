exports.run = (client, message, args) => {
  
  
  
  let score = Math.floor(Math.random() * (Math.floor(1) - Math.ceil(0) + 1));
  
  if (args[0] == "debug") {
    message.channel.send("The score is " + score);
  } else if (score == 1) {
    message.channel.send("The coin lands on heads. " + message.author).catch(console.error);
  } else {
    message.channel.send("The coin lands on tails. " + message.author).catch(console.error);
  }
}