exports.run = (client, message, args) => {
  const dataTime = require.main.require('./data/time.json')
  const $function = require.main.require('./const/funcion.js')

  var message = (dataTime.night == true) ? ":crescent_moon: It is currently **Nighttime**.\n:stopwatch: **Daybreak** " : ":sunny: It is currently **Daytime**.\n:stopwatch: **Nightfall** "

  message += (message.createdTimestamp() < dataTime.nextphase) ?  "occurs in **" + $function.timeleft(dataTime.nextphase, message.createdTimestamp()) + "**." : "has either already occured or does not exist. Something might be broken - ping hosts."

}
