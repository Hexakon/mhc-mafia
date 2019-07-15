exports.run = (client, message, args) => {
  const dataAT = require.main.require('./data/attri.json')

  var timenow = message.createdTimestamp()

  var message = "";

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

  if (dataAT.night == true) {
    message = ":crescent_moon: It is currently **Nighttime**.\n:stopwatch: **Daybreak** "
  } else {
    message = ":sunny: It is currently **Daytime**.\n:stopwatch: **Nightfall** "
  }

  if (timenow < dataAT.nextphase) {
    message = message + "occurs in **" + timeleft() + "**."
  } else {
    message = message + "has either already occured or does not exist. Something might be broken - ping hosts."
  }


}
