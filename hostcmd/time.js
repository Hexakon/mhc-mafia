exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataST = require("./../data/setup.json");
  const dataAT = require("./../data/attri.json");
  const dataAT_fn = __dirname + "/../data/attri.json";

  // thanks myself
  function timeleft() {
    let time = dataAT.nextphase - message.createdTimestamp; // get remaining time in ms

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
  }

  if (message.member.roles.find("name", "Host")) {
      async function toggletime () {
        if (dataAT.night == true) {
          dataAT.night = false;
          message.channel.send(":sunny: **The game has now entered Day phase!**");
          dataAT.nextphase = message.createdTimestamp() + dataST.daylength;
          message.channel.send(":tools: This was a manual change of time. Daytime is scheduled to end at **" + timeleft() + "** from now.");
          client.user.setPresence({ game: { name: 'INGAME: Daytime' }, status: 'online' })
        } else {
          dataAT.night = true;
          dataAT.exe = false;
          message.channel.send(":crescent_moon: **The game has now entered Night phase!**");
          dataAT.nextphase = message.createdTimestamp() + dataST.nightlength;
          message.channel.send(":tools: This was a manual change of time. Nighttime is scheduled to end at **" + timeleft() + "** from now.");
          client.user.setPresence({ game: { name: 'INGAME: Nighttime' }, status: 'online' })
        }
      }
      toggletime().then(() => {
        fs.writeFile(dataAT_fn, JSON.stringify(dataAT, null, 2), function (err) {if (err) return console.log(err);});
      });
    }
}
