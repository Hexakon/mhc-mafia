exports.run = (client, message, args) => {
  const dataTime = require.main.require('./data/time.json')
  const $function = require.main.require('./const/funcion.js')

  var timenow = message.createdTimestamp()

  var message = "";

  if (dataAT.night == true) {
    message = ":crescent_moon: It is currently **Nighttime**.\n:stopwatch: **Daybreak** "
  } else {
    message = ":sunny: It is currently **Daytime**.\n:stopwatch: **Nightfall** "
  }

  if (timenow < dataAT.nextphase) {
    message = message + "occurs in **" + $function.timeleft() + "**."
  } else {
    message = message + "has either already occured or does not exist. Something might be broken - ping hosts."
  }


}
