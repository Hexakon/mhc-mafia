exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  const dataCH = require("./../data/ch.json");
  const dataCH_fn = __dirname + "/../data/ch.json";
  
  let dataID = data.id
  let dataPP = data.pp
  
  const roles = require("./../roles.json");
  
  const dataRL = require("./../data/rl.json");
  const roletype = require("./../roletype.json");
  
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
  
  let primelist = args;
  
  //if (message.member.roles.find("name", "Host") && message.author.id == 132262525818503168) {
    
    let rolelist = [];
    let displaylist = "";
    
    for (let i=0; i<primelist.length; i++) {
      
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
      
      rolegen();
      
      rolelist.push(rolepointer);
      
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
  
    rolelist = shuffle(rolelist);
    
    for (let i=0; i<rolelist.length; i++) {
      displaylist = displaylist + "\n" + rolelist[i];
    }
    message.channel.send("**Generated role list: **"+displaylist);
  //}
}