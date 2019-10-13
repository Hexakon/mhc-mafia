exports.run = (client, message, args) => {
  const dataTime = require.main.require("./data/time.json");
  const $function = require.main.require("./const/function.js")

  if (dataTime.night === true) {
    message.channel.send(":sunny: **The game has been updated to Day "+(dataTime.dayNo+1)+"!**\n:stopwatch: **Night "+(dataTime.dayNo+1)+"** begins in "+$function.timeleft(dataTime.nextphase, message.createdTimestamp)+".");
    require(`./time/daybreak.js`).run(client, message, args);
  } else {
    message.channel.send(":crescent_moon: **The game has been updated to Night "+dataTime.dayNo+"!**\n:stopwatch: **Day "+(dataTime.dayNo+1)+"** begins in "+$function.timeleft(dataTime.nextphase, message.createdTimestamp)+".");
    require(`./time/nightfall.js`).run(client, message, args);
  }

}
