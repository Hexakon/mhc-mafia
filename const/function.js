module.exports = {

  playersWithRole: function (valid) {
  // returns an array or string of the alphabetical IDs of players with the specified role "valid";

    const $role = require.main.require("./const/role.json"); // requiring the list of unique roles.
    const dataPlayer = require.main.require("./data/player.json"); // requiring the list of player info.

    let list = Object.keys(dataPlayer.role).filter(key => dataPlayer.role[key] === valid);
    // get the alphabetical ID list of players who has the role 'valid.

    if ($role.unique.includes(valid)) { // if role is unique, output string. if not, output array. This is to separate unique and non-unique usage more easily.
      return list[0];
    } else {
      return list;
    }

  },

  writeFile: function (fnX, dataX) {
    const fs = require('fs');
    fs.writeFile(fnX, JSON.stringify(dataX, null, 2), function (err) {if (err) return console.log(err);});
  },

  shuffle: function (oldArray) { // code provided by chocoparrot
    let newArray = Array.from(oldArray); // new, unshuffled array to be shuffled and returned
    for (var i = 0; i < newArray.length; i++) {
      var jumble = Math.floor(Math.random() * i); // random number based on position
      var cache = newArray[i]; // old item to be replaced
      newArray[i] = newArray[jumble]; // old item is replaced by random item
      newArray[jumble] = cache; // random item is replaced by old item
    };
    return newArray;
  },

  timeleft: function (timeNext, timeNow) { // dataTime.nextphase, message.createdTimestamp
    let time = timeNext - timeNow; // get remaining time in ms

    let h = Math.floor(time/3600000);
    let m = Math.floor((time%3600000)/60000);
    let s = Math.ceil(((time%3600000)%60000)/1000);

    let text = ""; // string variable to be displayed

    if (h == 1) {
      text += "1 hour";
    } else if (h > 1) {
      text += h + " hours";
    }

    if (h != 0 && m != 0) { // add conjunction
      text += ", "
    } else if (h != 0 && m == 0) {
      text += " and "
    }

    if (m == 1) {
      text += "1 minute";
    } else if (m > 1) {
      text += m + " minutes";
    }

    if (m != 0) { // add conjunction
      text += " and "
    }

    if (s == 1) {
      text = text + "1 second";
    } else {
      text = text + s + " seconds";
    }

    return text;
  },

  rolegen: function (rolelist) {

    const $role = require.main.require("./const/role.json"); // requiring role information.

    let rolelistNew = []; // empty array of new roles.

    function generate (role) { // function for generating the role (used for recursion in line 95)
      let roleNew = "" // new role to be returned.

      if ($role.categories.includes(role)) { // if role entry is a category, get a random item from the category.
        var category = (role === "any") ? $role.rolelist : $role[role]
        // note: conditional operator: before colon is if expression is true, after colon is false
        roleNew = category[Math.floor(Math.random() * category.length)];
      }

      // if role entry is an alias of a role, get its full role name.
      if (Object.keys($role.alias).includes(role)) roleNew = $role.alias[role];

      // if two of the same unique roles exist, OR if primelist has already occupied the role, reroll.
      if (($role.unique.includes(roleNew) && rolelist.filter(roleNew => roleNew )) || rolelist.includes(roleNew)) generate();

      // if primelist[i] is already a full role name, use full role name.
      if ($role.rolelist.includes(role)) roleNew = role;

      return roleNew
    }

    rolelist.forEach(role => { // repeat this for every role in the list
      rolelistNew.push(generate(role));
    })

    // note that at this stage the roles have yet NOT been shuffled, so all slots in rolelist and rolelistNew are synced with the other array. The following code snippets aim to replace impossible role combinations using this information.

    // response to "exorcist but no cultist" situations
    if (!rolelistNew.includes("cultist") && rolelistNew.includes("exorcist")) {
      // "entries()" array method returns an array iterator with index-value pairs
      for (let [index, roleNew] of rolelistNew.filter(role => role === "exorcist").entries()) {
        // tests if roleNew was generated from a category slot. If it is NOT (return true as the category does not exist), the role is unaltered to allow the situation to exist in fixed setups.
        roleNew = (typeof $role[rolelist[index]] === "undefined") ? roleNew : $role[rolelist[index]][Math.floor(Math.random() * rolelist[index].length)];
        // rolelist[index] = the "category" in that slot.
      }
    }

    // response to mutually exclusive roles
    if (rolelistNew.includes("mayor") && rolelistNew.includes("marshal")) {

      function shuffle(oldArray) { // code provided by chocoparrot - see exports.shuffle above for comments
        let newArray = Array.from(oldArray);
        for (var i = 0; i < newArray.length; i++) {
          var jumble = Math.floor(Math.random() * i);
          var cache = newArray[i];
          newArray[i] = newArray[jumble];
          newArray[jumble] = cache;
        };
        return newArray;
      }
      let shuffledList = shuffle(rolelistNew.filter(role => role === "mayor" || role === "marshal"));

      // same logic as above
      for (let [index, roleNew] of shuffledList.entries()) {
        roleNew = (typeof $role[rolelist[index]] === "undefined") ? roleNew : $role[rolelist[index]][Math.floor(Math.random() * rolelist[index].length)];
      }

    }


    return rolelistNew;

  },

  logbook: function (message, phase, events, intro, lang) {
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
      }
    }
    logbook += "\n\n*" + message.guild.roles.find("name", "Alive").members.size + " citizens remain.*\n" + message.guild.roles.find("name", "Alive")

    return logbook;
  }
};
