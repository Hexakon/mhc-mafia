exports.run = (client, message, args) => {
  const request = require('request');
  
  message.channel.startTyping();
  
  request('https://catfact.ninja/fact', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var content = JSON.parse(body); // Parsing body from String to Object
    message.channel.send(":cat: **Cat fact:** "+content.fact);
    message.channel.stopTyping(true);
  });
  
}