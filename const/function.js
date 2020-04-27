function playersWithRole(valid) { // This function returns an array or string of the alphabetical IDs of players with the specified role "valid".

  const dataPlayer = require.main.require("./data/player.json"); // requiring the list of player info.

  let array_keys = Object.keys(dataPlayer.role).filter(key => dataPlayer.role[key] === valid);
  // get the alphabetical ID list of players whose role is 'valid'. The function only matches what is written in the dataPlayer file.

  let array_map = new Array();
  for (let item of array_keys) {
    array_map.push([item, dataPlayer.userId[item]])
  }

  return new Map(array_map);
  // map with ingame id as key and discord user id as value

}



function writeFile(fnX, dataX) { // This function overwrites the json file at fnX with dataX
  const fs = require('fs');
  fs.writeFile(fnX, JSON.stringify(dataX, null, 2), function (err) {if (err) return console.log(err);});
}



function shuffle(oldArray) { // This function shuffles oldArray using the Fisher-Yates shuffle algorithm, provided by ChocoParrot. Primarily used in role list generation.
  let newArray = Array.from(oldArray); // new, unshuffled array to be shuffled and returned
  for (var i = 0; i < newArray.length; i++) {
    var jumble = Math.floor(Math.random() * i); // random number based on position
    var cache = newArray[i]; // old item to be replaced
    newArray[i] = newArray[jumble]; // old item is replaced by random item
    newArray[jumble] = cache; // random item is replaced by old item
  }
  return newArray; // return the shuffled
}



function dig(obj) { // This function produces every value contained with an object in an array. Primarily used for pulling role pools in role generation.
  let data = []
  for (const i of Object.keys(obj)) { // for every key within 'obj':
      if (Array.isArray(obj[i])) data = data.concat(obj[i]); // if the corresponding value is an array, concatenate it.
      else if (typeof obj[i] === "object") data = data.concat(dig(obj[i])); // if it's an object with more items, use recursion to go one step further, then concatenate the result of that recursion.
      else if (typeof obj[i] !== "undefined") data.push(obj[i]); // if it's anything else, push it into the data array as one entry.
      else continue; // if it's undefined (which shouldn't happen), ignore it.
  }
  return data
}

function timeleft(timeNext, timeNow) { // This function grabs two timestamps and outputs the distance between them in plain English.
  // dataTime.nextphase, message.createdTimestamp
  let time = timeNext - timeNow; // get remaining time in ms

  let h = Math.floor(time/3600000);
  let m = Math.floor((time%3600000)/60000);
  let s = Math.ceil(((time%3600000)%60000)/1000);

  let text = ""; // string variable to be displayed

  // Hour
  if (h == 1) text += "1 hour";
  else if (h > 1) text += h + " hours";

  // Conjunction
  if (h != 0 && m != 0) text += ", ";
  else if (h != 0 && m == 0) text += " and ";

  // Minute
  if (m == 1) text += "1 minute";
  else if (m > 1) text += m + " minutes";

  // Conjunction
  if (m != 0) text += " and "

  // Second
  if (s == 1) text = text + "1 second";
  else text = text + s + " seconds";

  return text;
}

function rolegen(setup) { // The ultimate function to generate role lists.

  const $rolepool = require.main.require("./const/rolepool.json"); // requiring role information.
  const $roleMeta = require.main.require("./const/rolemeta.json"); // requiring data about each role, and for a list of every role together.

  let rolelistNew = []; // empty array of new roles.

  setup = shuffle(setup); // shuffle the original setup

  setup.forEach(input => { // for every role slot in the original list (setup), generate a role.
    
    // if input is a role's full name, add it to the list right away.
    if (Object.keys($roleMeta).includes(input)) rolelistNew.push(input);

    // if input is an alias of a role, get its full role name.
    else if (Object.keys($rolepool.alias).includes(input)) rolelistNew.push($rolepool.alias[input]);

    // if, despite the alias, the input is still not a role, then it's assumed to be a pool (category).
    else if (!Object.keys($roleMeta).includes(input)) {

      let pool = []; // this is where the pool of roles will be stored.
      let obj = ''; // this is where the current object path will be stored.

      // pools are inputted as following:
      // 1. if the slot is "any", all-any is assumed for the slot.
      // 2. Otherwise, pools are split up in letter pairs separated by +, e.g. ti+ts+tk
      // 2. if a pool only has one letter, then it includes all roles within the category, e.g. t+m

      if (input === "any") pool = Object.keys($roleMeta)
      // note: conditional operator: before colon is if expression is true, after colon is false
      else { // the following bracket executes if the role pool isn't all-any.
        input.split("+").forEach(subpool => {
          obj = subpool[0] === 't' ? $rolepool.roles.town
          : subpool[0] === 'm' ? $rolepool.roles.mafia
          : subpool[0] === 'n' ? $rolepool.roles.neutral
          : "invalid"
          if (obj === "invalid") return // skip the input if the subpool does not exist.
          if (subpool[1] === undefined) {
            pool = pool.concat(dig(obj)) // get every role in the faction.
            console.log(pool)
          } else {
            let cat = Object.keys(obj).filter(key => key[0] === subpool[1]) // check if there is a key (faction subcategory) that starts with the second letter of the subpool input pair.
            if (cat.length === 0) return // if nothing matches, then the input was invalid.
            else pool = pool.concat(obj[cat[0]]) // cat[0] is array -> string.
            console.log("pool gen progress: "+pool)
          }
        })
      }

      pool = shuffle(pool) // first, shuffle the order of the roles within the pool.
      console.log(pool)

      for (let role of shuffle(pool)) { // start from the first role in the pool, and proceed to the next if it is impossible.
        
        console.log("Testing role: "+role)

        // condition 1: if the role is unique, and the list already has the role, move on to the next.
         try{ if ($roleMeta[role].condition.unique === true && rolelistNew.contains(role)) continue; }
         catch(e) {}
        
        // condition 2: if the role is incompatible with others, and the list already has one of those roles, move on to the next.
        try{ if (typeof $roleMeta[role].condition.incompatible !== undefined && $roleMeta[role].condition.incompatible.some(i => rolelistNew.contains(i))) continue; }
        catch(e) {}

        // condition 3: if the role requires other roles, and the list does NOT have those roles, move on to the next.
        try{ if (typeof $roleMeta[role].condition.require !== undefined && $roleMeta[role].condition.require.some(i => !rolelistNew.contains(i))) continue; }
        catch(e) {}

        // if all conditions pass, the role is added.
        rolelistNew.push(role);
        break;
      }
    }
  });

  return rolelistNew;

}

function logbook(message, phase, events, intro) {
  let logbook = "**- - -   "+phase.toUpperCase()+"   - - -**\n*("+ new Date().toUTCString()+")*\n\n"

  logbook += (intro !== undefined) ? "*" + intro + "*\n\n" : ""

  if (events.length === 0) {
    logbook += "Nothing of interest occured."
  } else {
    for (let i=0; i<events.length; i++) {
      // edit these to allow lang input later.
      logbook += (events[i][0] === "death") ? "**The body of " + message.guild.members.get(events[i][1]) + " was found in their home last night.**" : "" // edit this to accept death types later.
      logbook += (events[i][0] === "attorney") ? ":briefcase: **" + message.guild.members.get(events[i][1]) + " is under protection of an Attorney!**\nThey cannot be voted against during today's trial." : ""
      logbook += (events[i][0] === "amnesiac") ? ":bulb: **An Amnesiac has remembered that they were a " + events[i][1] + "!**" : ""
      logbook += (events[i][0] === "secretary") ? ":bulb: **A Secretary has sided with the " + events[i][1] + "!**" : ""
      logbook += (events[i][0] === "reveal") ? ":loudspeaker: **" + message.guild.members.get(events[i][1]) + " has revealed themselves as " + events[i][2] + "!**" : ""
      logbook += (events[i][0] === "trialdeath") ? "**" + message.guild.members.get(events[i][1]) + " has been lynched by "+events[i][2]+" votes.**" : ""
      logbook += "\n\n"
    }
  }
  logbook += "*" + message.guild.roles.find("name", "Alive").members.size + " citizens remain.*\n" + message.guild.roles.find("name", "Alive")

  return logbook;
}

module.exports = {
  playersWithRole,
  writeFile,
  shuffle,
  dig,
  timeleft,
  rolegen,
  logbook
}
