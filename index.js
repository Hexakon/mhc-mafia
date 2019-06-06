const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN;

const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK"))
expressApp.listen(process.env.PORT)

let prefix = ".";

//client.on & other events
client.on("ready", () => {
  const dataCH = require("./data/ch.json");
  client.guilds.get('442612372553728010').channels.get(dataCH.trial).fetchMessages({limit:1})
  console.log("I am ready!");
  client.user.setPresence({ game: { name: 'MHC:Mafia v0.1.34' }, status: 'online' })
});

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  client.channels.get('442613933979861004').send("restarting...");
});



client.on("guildMemberAdd", (member) => {
  member.guild.channels.get("442613933979861004").send(`:wave: Welcome to Mayhem City: Mafia, ${member}! Please read the rules in <#496705905312661525> before participating.`);
});

client.on("guildMemberRemove", (member) => {
  const inout = require("./inout.json");
  const outres = inout.out
  let n = Math.floor(Math.random()*outres.length)
  member.guild.channels.get("442613933979861004").send(":eject: "+outres[n][0] +"**"+member.displayName+"**"+ outres[n][1]);
});



client.on("messageReactionAdd", (messageReaction, user) => {
  console.log("Detected reaction "+messageReaction.emoji+" from "+user.username);
  const dataCH = require("./data/ch.json");
  const member = messageReaction.message.guild.members.get(user.id);
  if (!member.roles.find("name", "Host")) {
    if (messageReaction.message.channel.id === dataCH.trial && !member.roles.find("name", "Alive")) {
      messageReaction.remove(user);
      user.send(":warning: **Please do not react to trial votes while dead or outside of the game.**");
    }
  }
})



client.on("message", (message) => { // split command message into base (cmd) and arguments (args) separated by space
  
  const dataCH = require("./data/ch.json");
  const dataAT = require("./data/attri.json");
  const dataRL = require("./data/rl.json");
  const data = require("./data/id.json");
  const dataW = require("./data/w.json");
  const dataID = data.id;
  const dataPP = data.pp;
  
  if (message.channel.id == dataCH.int && message.author.bot == false) { // SPECIAL INTERROGATION MIRROR
    client.channels.get(dataPP[dataRL.int]).send(":microphone2: **"+message.member.displayName+"**: *"+message.content+"*");
  }
  if (message.channel.id == dataCH.dead && message.author.bot == false && dataAT.night == true) { // AFTERLIFE MIRROR
    for (var i=0; i < dataRL.med.length; i++) {
      client.channels.get(dataPP[dataRL.med[i]]).send(":crystal_ball: **"+message.member.displayName+"**: *"+message.content+"*");
    }
  }
  
  if (message.channel.id == dataCH.logbook) { // REACTIONS FOR LOGBOOK
    
    async function react() {
      await message.react(message.guild.emojis.get('444437356540592128'));
      await message.react(message.guild.emojis.get('513131143202340866'));
    }
    
    react();
  }
  
  if (message.channel.id == dataCH.trial && message.author.bot == false) { // POLL REACTIONS FOR TRIAL
    let keys = Object.keys(dataPP);
    let indicators = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];
    
    async function indicate() {
      for (let i = 0; i < 26; i++) { // iterating for the length of the alphabet
        if (message.isMentioned(dataID[keys[i]])) {
          await message.react(indicators[i]); // react with corresponding letter ID from the array above
        }
      }
    }
    
    indicate();
  }
  
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  // command handler
   try {
    let cmdFile = require(`./cmd/${cmd}.js`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(token);