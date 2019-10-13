exports.run = (client, message, args) => {

    let text = args.join(" ");
    message.delete(100);
    message.channel.send(text);
  
}
