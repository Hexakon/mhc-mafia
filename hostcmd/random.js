exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  
  function shuffle (x) { // code by chocoparrot uwu
    let arr = Array.from(x); // le duplicate array
    for (var i = 0; i < arr.length; i++) {
      var jumble = Math.floor(Math.random() * i);
      var cache = arr[i];
      arr[i] = arr[jumble];
      arr[jumble] = cache;
    };
    return arr;
  };
  
  let item = shuffle(Object.keys(data.id))
  item = data.id[item[0]];
  
  message.channel.send(":game_die: I choose... **"+message.guild.members.get(item)+"**");
  
}