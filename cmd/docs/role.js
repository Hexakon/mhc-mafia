exports.run = (client, message, args) => {
const Discord = require("discord.js");
const $role = require.main.require("./const/role.json");
const $roleinfo = require.main.require("./const/roleinfo.json");
const $roleMeta = require.main.require("./const/rolemeta.json");

const aliasKeys = Object.keys($role.alias);

var EmbedColor = ''
var RoleGoal = ''

  if (args[0] != undefined) { args[0] = args[0].toLowerCase(); }

      if (aliasKeys.includes(args[0])) { // check if role is shorthand: if yes then set to full name
        args[0] = $role.alias[args[0]];
      }
      if ($role.rolelist.includes(args[0])) { // check if role is in the rolelist

        let Role = $roleinfo[args[0]];

        if ($role.town.includes(args[0])) { // set embed color and goal
          EmbedColor = '#32cd32';
          RoleGoal = 'Lynch every criminal and evil-doer.';
        } else if ($role.mafia.includes(args[0])) {
          EmbedColor = '#b22222';
          RoleGoal = 'Kill everyone who opposes the Mafia.';
        } else if ($role.cult.includes(args[0])) {
          EmbedColor = '#696969';
          RoleGoal = 'Kill everyone who opposes the Cult.';
        } else {
          RoleGoal = 'Kill everyone who opposes you.';
          if (Role.name == "Serial Killer") {
            EmbedColor = '#0000cd';
          } else if (Role.name == "Arsonist") {
            EmbedColor = '#ff8c00';
          } else if (Role.name == "Demolitionist") {
            EmbedColor = '#8b4513';
          } else if (Role.name == "Juggernaut") {
            EmbedColor = '#8b0000';
          } else {
            EmbedColor = '#888888';
            RoleGoal = Role.goal;
          }
        }

        if (args[1] != null && !(["desc","description"].includes(args[1].toLowerCase()))) { // this clause includes all non-default (description) responses for the command.
          if (Object.keys(Role.subtext).includes(args[1].toLowerCase())) { // per-role extra description
            let Sub = Role.subtext[args[1]]; // defines "Sub" as title (0) and content (1)

            const embed = new Discord.RichEmbed() // embed of subtext
            .setColor(EmbedColor)
            .setTitle(Sub[0])
            .addField(Role.name, Sub[1]) // since field titles are now in gray, this works as a subtitle.
            .setTimestamp()
            .setFooter('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png')
            message.channel.send({embed});

          } else if (["info","aa","stat"].includes(args[1].toLowerCase())) { // "ability-attribute" info display

            const embed = new Discord.RichEmbed() // embed of text
            .setColor(EmbedColor)
            .setTitle("**"+Role.name+"**")
            .addField(Role.alignment, "**Abilities:**\n"+Role.ability+"\n\n**Attributes:**\n"+Role.attribute+"\n\n**Goal:** "+RoleGoal)
            .setTimestamp()
            .setFooter('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png')
            if (Role.seeAlso != null) {
              embed
              .addField("See Also:", Role.seeAlso)
            }
            message.channel.send({embed});

          } else if (["data","meta"].includes(args[1].toLowerCase())) {

            let MRole = $roleMeta[Role];
            // Unfinished: Funky number-to-text conversion here
            for (let Key of ["attack","defense","vote","detection","control","roleblock","absence"]) {
              Role[Key] = [];
            }
            for (let AlwaysKey of Object.keys(MRole.always)) {
              Role[AlwaysKey].push(MRole.always[AlwaysKey])
            }
            for (let OuterKey of Object.keys(MRole)) {
              if (OuterKey == "always") continue
              for (let InnerKey of Object.keys(MRole[OuterKey])) {
                Role[InnerKey].push(MRole[OuterKey][InnerKey])
              }
            }
            

            const embed = new Discord.RichEmbed() // embed of metadata
            .setColor(EmbedColor)
            .setTitle("**"+Role.name+"**")
            .addField("Alignment:", Role.alignment, true)
            .addField("Attack:", Role.attack.join(" -> "), true)
            .addField("Defense:", Role.defense.join(" -> "), true)
            .addField("Vote magnitude:", Role.vote.join(" -> "), true)
            .addField("Detection Immunity:", Role.detection.join(" -> "), true)
            .addField("Control Immunity:", Role.control.join(" -> "), true)
            .addField("Roleblock Immunity:", Role.roleblock.join(" -> "), true)
            .addField("Absence Immunity:", Role.absence.join(" -> "), true)
            .setTimestamp()
            .setFooter('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png')
            message.channel.send({embed});

          } else if (["card"].includes(args[1].toLowerCase())) {
            message.channel.send('http://hex4nova.cf/mafia/cards/'+Role.name.toLowerCase()+'.png')
          } else if (["wiki"].includes(args[1].toLowerCase())) {
            message.channel.send('http://hex4nova.cf/mafia/roles/'+Role.name.toLowerCase()+'')
          }
        } else {
          const embed = new Discord.RichEmbed() // embed of main text
          .setColor(EmbedColor)
          .setTitle(Role.name)
          .addField(Role.alignment, Role.desc.join("\n")) // since field titles are now in gray, this works as a subtitle.
          .setTimestamp()
          .setFooter('Mayhem City: Mafia', 'https://cdn.discordapp.com/avatars/462545110144516096/1c45ebd0c04974f3f3dc1ee5b01d30c7.png')
          if (Role.alias != null) {
            embed
            .setTitle(Role.name + " (" + Role.alias.join(", ") + ")")
          }
          message.channel.send({embed});
        }
      } else if (args[0] != null) {
          message.channel.send(":warning: That role doesn't seem to exist.");
      } else {
        message.channel.send("`.role` will instantly fetch basic information of a certain role. Shorthand names are permitted. Do not include spaces for roles whose names are 2 words or longer.\n\n**Usage:** `.role <role name>`\n**Alias:** `.r`");
      }
}
