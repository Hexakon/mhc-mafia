const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN;

const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK"))
expressApp.listen(process.env.PORT)

client.options.disableEveryone = true;

let prefix = ".";
let hostprefix = "-";

//client.on & other events
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({ game: { name: 'Mayhem City: Mafia' }, status: 'online' })
});

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  client.channels.get(process.env.LOBBY_ID).send("restarting...");
});



client.on("guildMemberAdd", (member) => {
  member.guild.channels.get(process.env.LOBBY_ID).send(`:wave: Welcome to Mayhem City: Mafia, ${member}! Please read the rules in ${member.guild.channels.find("name", "readme")} before participating.`);
});

client.on("guildMemberRemove", (member) => {
  const $inout = require("./const/inout.json");
  const outres = $inout.out
  let n = Math.floor(Math.random()*outres.length)
  member.guild.channels.get(process.env.LOBBY_ID).send(":eject: "+outres[n][0] +"**"+member.displayName+"**"+ outres[n][1]);
});



client.on("messageReactionAdd", (messageReaction, user) => {
  console.log("Detected reaction "+messageReaction.emoji+" from "+user.username);
  const dataChannel = require("./data/channel.json");
  const member = messageReaction.message.guild.members.get(user.id);
  if (!member.roles.find("name", "Host") && messageReaction.message.channel.id === dataChannel.trial && !member.roles.find("name", "Alive")) {
    messageReaction.remove(user);
    user.send(":warning: **Please do not react to trial votes while dead or outside of the game.**");
  }
})



client.on("message", (message) => { // split command message into base (cmd) and arguments (args) separated by space

  const dataChannel = require("./data/channel.json");
  const dataTime = require("./data/time.json");
  const dataPlayer = require("./data/player.json");
  const dataWhisper = require("./data/whisper.json");
  const $function = require("./const/function.js");

  if (message.channel.id == dataChannel.int && message.author.bot == false) { // INTERROGATION MIRROR
    for (let alphaId of $function.playersWithRole("interrogator").keys()) {
      message.guild.channels.get(dataPlayer.channelId[alphaId]).send(":microphone2: **"+message.member.displayName+"**: *"+message.content+"*");
    }
  }
  if (message.channel.id == dataChannel.dead && message.author.bot == false && dataTime.night == true) { // AFTERLIFE MIRROR
    for (let alphaId of $function.playersWithRole("medium").keys()) {
      client.channels.get(dataPlayer.channelId[alphaId]).send(":crystal_ball: **"+message.member.displayName+"**: *"+message.content+"*");
    }
  }

  if (message.channel.id == dataChannel.logbook) { // REACTIONS FOR LOGBOOK

    async function react() {
      await message.react(message.guild.emojis.get('444437356540592128'));
      await message.react(message.guild.emojis.get('513131143202340866'));
    }

    react();
  }

  if (message.channel.id == dataChannel.trial && message.author.bot == false) { // POLL REACTIONS FOR TRIAL

    const $index = require("./const/index.json")

    async function indicate() {
      for (let i = 0; i < 26; i++) { // iterating for the length of the alphabet
        if (message.isMentioned(dataPlayer.userId[$index.lowerAlpha[i]])) {
          await message.react($index.indicators[i]); // react with corresponding letter ID from the array above
        }
      }
    }

    indicate();
  }

  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  // return if user is attempting to seek path
  if (cmd.charAt(0) === ".") return;

  // user commands
  if (message.content.indexOf(prefix) === 0) {

    const fs = require("fs");

    // ingame commands
    if (fs.existsSync(`./cmd/ingame/${cmd}.js`)) {
      try {
        let cmdFile = require(`./cmd/ingame/${cmd}.js`);
        if (message.member.roles.find("name", "Alive") || message.member.roles.find("name", "Host")) {
          cmdFile.run(client, message, args);
        } else {
          message.channel.send(":warning: **You must be ingame and alive to use this command!**");
          throw "Error: "+message.author.username+"#"+message.author.discriminator+" attempted to use command \""+cmd+"\" but did not have the Alive role.";
        }
      } catch (err) {
        console.error(err);
      }
    }

    // literally every other command
    for (let path of new Array('docs','util','misc')) {
      if (fs.existsSync(`./cmd/${path}/${cmd}.js`)) {
        try {
          let cmdFile = require(`./cmd/${path}/${cmd}.js`);
          cmdFile.run(client, message, args);
          break;
        } catch (err) {
          console.error(err);
        }
      }
    }

  }

  // host commands
  if (message.content.indexOf(hostprefix) === 0) {
    try {
     let cmdFile = require(`./hostcmd/${cmd}.js`);
     // role validation
     if (message.member.roles.find("name", "Host")) {
       cmdFile.run(client, message, args);
     } else {
       message.channel.send(":warning: **You must be a host to use this command!**");
       throw "Error: "+message.author.username+"#"+message.author.discriminator+" attempted to use command \""+cmd+"\" but did not have the Host role.";
     }
    } catch (err) {
     console.error(err);
    }
  }
});

client.login(token);
