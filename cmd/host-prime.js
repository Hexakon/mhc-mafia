exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  const dataCH = require("./../data/ch.json");
  const dataCH_fn = __dirname + "/../data/ch.json";
  
  let dataID = data.id
  let dataPP = data.pp
  const dataW = require("./../data/w.json");
  let dataWM = dataW.lastmsg;
  const dataW_fn = __dirname + "/../data/w.json";
  
  const rolePass = message.guild.roles.get('442709460461551626');
  const roleAlive = message.guild.roles.get('442613191139262464');
  const passList = rolePass.members;
  
  const roles = require("./../roles.json");
  const dataRL = require("./../data/rl.json");
  const nicks = require("./../nicks.json");
  
  const roletype = require("./../roletype.json");
  
  let deck = []; // snowflake of every member in passList
  
  for (let [sf, user] of passList) {
    deck.push(sf);
  }
  
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
  
  deck = shuffle(deck);
  let nick = shuffle(nicks);
  
  if (message.member.roles.find("name", "Host") && message.author.id == 132262525818503168) {
    if (args[0] == "YESIMSURE") {
    
      message.channel.send(":construction: **The game is being prepared, please stand by.** :construction:");
      
      async function assignid () {
        let i = 0;
        let user = "";
        let list = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        let keys = Object.keys(dataPP); // lowercase alphabet
        let displaylist = ""; // rolelist to be displayed in a readable format
        let rolelist = []; // empty list that is to be filled with the final role list
        let primelist = dataRL.rolelist; // get the saved rolelist.
        
        for (let sf of deck) {
          user = passList.get(sf);
          
          await user.addRole('442613191139262464');
          await user.removeRole('442709460461551626');
          let channel = await message.channel.guild.createChannel(list[i], 'text');
          await channel.setParent(dataCH.pricat)
          await channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
          await channel.overwritePermissions('460028455464206337', {VIEW_CHANNEL: true, SEND_MESSAGES: false});
          await channel.overwritePermissions(sf, {VIEW_CHANNEL: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true});
          dataPP[keys[i]] = channel.id;
          
          if (user.nickname === null) {
            await user.setNickname(nick[i]);
          }
          
          await user.setNickname("["+list[i]+"] "+user.displayName); // sets nickname with letter ID
          dataID[keys[i]] = sf;
          dataWM[sf] = 0;
          
          let rolepointer = "";
    
          function rolegen() {
            if (roletype.categories.includes(primelist[i])) { // if role entry is a category, get a random item from the category.
              var category = "";
              if (primelist[i] == "any") {
                category = roles.rolelist;
              } else {
                category = roles[primelist[i]];
              }
              rolepointer = category[Math.floor(Math.random() * category.length)];
            }
            if (Object.keys(roles.alias).includes(primelist[i])) { // if role entry is an alias of a role, get the full role name.
              rolepointer = roles.alias[primelist[i]];
            }
            if (roles.unique.includes(rolepointer) && rolelist.includes(rolepointer)) { // if two of the same unique roles exist, reroll. 
              rolegen();
            }
            if (primelist.includes(rolepointer)) { // if primelist has already occupied the role, reroll.
              rolegen();
            }
            if (roles.rolelist.includes(primelist[i])) { // if primelist[i] is already a full role name, use full role name.
              rolepointer = primelist[i];
            }
          }
      
          rolegen(); // call for the function here.
      
          rolelist.push(rolepointer); // when the rolepointer has been set to a role, add it to rolelist.
          
          i++; // increase index value that is used by primelist[i].
        }
        
        function exorcist() {
          if (rolelist.includes("cultist") == false && rolelist.includes("exorcist") == true) {
            let i = rolelist.indexOf("exorcist");
            if (i != -1) {
              let category = roles[primelist[i]];
              let rolepointer = category[Math.floor(Math.random() * category.length)];
              rolelist[i] = rolepointer;
              
              exorcist();
            }
          }
        }
        exorcist();
        
        const aliveList = roleAlive.members;
        
        rolelist = shuffle(rolelist);
        
        let n=0;
        displaylist = "```";
        for (let sf of deck) {
          user = passList.get(sf);
          displaylist = displaylist+"\n"+user+" = "+rolelist[n]; // add a row of text to displaylist.
          n++;
        }
        displaylist = displaylist+"\n```";
        message.channel.send(displaylist);
      }
      
      message.channel.guild.createChannel('mafia', 'text')
      .then(channel => {channel.setParent(dataCH.pricat);
                        channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions('460028455464206337', {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                        dataCH.mafia = channel.id;
                        message.channel.send(`Mafia channel has been set to ${message.guild.channels.get(dataCH.mafia)}.`);
      })
      message.channel.guild.createChannel('cult', 'text')
      .then(channel => {channel.setParent(dataCH.pricat);
                        channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions('460028455464206337', {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                        dataCH.cult = channel.id;
                        message.channel.send(`Cult channel has been set to ${message.guild.channels.get(dataCH.cult)}.`);
      })
      message.channel.guild.createChannel('interrogation_room', 'text')
      .then(channel => {channel.setParent(dataCH.pricat);
                        channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions('460028455464206337', {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                        dataCH.int = channel.id;
                        message.channel.send(`Interrogation channel has been set to ${message.guild.channels.get(dataCH.int)}.`);
      })
      
      assignid().then(() => {
        fs.writeFile(data_fn, JSON.stringify(data, null, 2), function (err) {if (err) return console.log(err);});
        fs.writeFile(dataW_fn, JSON.stringify(dataW, null, 2), function (err) {if (err) return console.log(err);});
        fs.writeFile(dataCH_fn, JSON.stringify(dataCH, null, 2), function (err) {if (err) return console.log(err);});
      });
      
      message.channel.send("**The game has been set up.**");
      
      
    } else {
      message.channel.send(":warning: **Are you sure you want to prepare the game now?**");
    }
  }
}