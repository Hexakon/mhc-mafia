exports.run = (client, message, args) => {
const Discord = require("discord.js");
const roles = require("./../roles.json");
const roletype = require("./../roletype.json");
  
  
      let roledisplay = ""; // the role list in question
      let exinfo = ""; // additional information, grabbed by exarg
      if (roletype.shortlist.includes(args[0])) {
        args[0] = roletype.alias[args[0]]; // changes full name to shorthand (ironic amirite)
      }
      let category = args[0];
      if (roletype.shortlist.includes(args[1])) {
        args[1] = roletype.alias[args[1]]; // changes full subcategory name to shorthand (once again, haha funni)
      }
      if (args[1] != null && args[1].length < 2) {
        var rolecat = args[0].concat(args[1]); // if args[1] exist then join with args[0]
        var exarg = args[2]; // extra argument
      } else {
        var rolecat = args[0]; // if not exist then set rolecat to just args[0]
        var exarg = args[1];
      }
      
      if (args.length < 1 || rolecat == "help") {
        message.channel.send("There are currently **"+roles.town.length+"** Town roles, **"+roles.mafia.length+"** Mafia roles and **"+roles.neutral.length+"** Neutral roles in Mayhem City.\n\n**Usage:**\n`.roles <faction> [category]` to sort the roles by faction and category.\n`.roles <unique/u> [faction]` to see what roles classify as unique.\n`.roles <factional/f>` to see what roles are factional and cannot win with each other.\n`.roles all` to see all roles in a single list.\nAppend `info` to your command to display additional information.\n\n**Alias:** `.rolelist`, `.rl`");
      }
  
  
      if (args[0] == "all") {
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .addField('Mayhem City Roles', roles.rolelist, true)
        message.author.send({embed});
        message.channel.send("**"+message.author.username+"**, the full role list has been messaged to you!");
        
        
      } else if (args[0] == "town" || args[0].startsWith("t")) { // arg = town
        if (rolecat == "ti") {  // TI list
          for (var i=0;i<roles.ti.length;i++) {roledisplay += roles.ti[i]+"\n";} rolecat="Town Investigative";
          exinfo = "**Town Investigative** roles have the ability to individually find and locate information about players. This makes them a dangerous nuisance to the Mafia and other evildoers, and an important source of leads to the Town.";
          
        } else if (rolecat == "tp") {  // TP list
          for (var i=0;i<roles.tp.length;i++) {roledisplay += roles.tp[i]+"\n";} rolecat="Town Protective";
          exinfo = "**Town Protective** roles have the power protect their targets from attacks, effectively hindering evils from eliminating important Town roles, such as an officially revealed or otherwise confirmed important Town member that may be in immediate danger.";
          
        } else if (rolecat == "tk") {  // TK list
          for (var i=0;i<roles.tk.length;i++) {roledisplay += roles.tk[i]+"\n";} rolecat="Town Killing";
          exinfo = "As the name suggests, **Town Killing** roles can directly attack and eliminate players, giving them the power to quickly turn the tides of the game. Though, this brings a risk of Town Killing roles unintentionally killing other Town members, reducing the already fragile majority.";
          
        } else if (rolecat == "ts") {  // TP list
          for (var i=0;i<roles.ts.length;i++) {roledisplay += roles.ts[i]+"\n";} rolecat="Town Support";
          exinfo = "**Town Support** roles are roles who don't fit into any of the other categories, but are still helpful to the Town in their own ways. Town Support roles are usually considered more impactful during late-game, as the pool of suspect shrinks and the Town can pinpoint scums more accurately.";
          
        } else { // nothing
          for (var i=0;i<roles.town.length;i++) {roledisplay += roles.town[i]+"\n";} rolecat="Town"; var showcat = true;
          exinfo = "The **Town** is the uninformed majority. All Town roles share the same __Goal__: They must eliminate every other faction, but they must also kill all non-factional roles who oppose the Town. The Town has the advantage in size over any opposition, but they lack knowledge about each other. When playing as Town, communication will help narrow down suspects.";
        }
        
        if (showcat == true) { // should the embed show a list of categories?
          const embed = new Discord.RichEmbed()
          .setColor('#32cd32')
          .addField(rolecat+":", roledisplay, true)
          .addField("Categories:", "investigative\nprotective\nkilling\nsupport", true)
          message.channel.send({embed});
        } else {
          const embed = new Discord.RichEmbed()
          .setColor('#32cd32')
          .addField(rolecat+":", roledisplay, true)
          message.channel.send({embed});
        }
        
        
      } else if (args[0] == "mafia" || args[0].startsWith("m")) { // arg = mafia
        
        if (rolecat == "mk") { // MK list
          for (var i=0;i<roles.mk.length;i++) {roledisplay += roles.mk[i]+"\n";} rolecat="Mafia Killing";
          exinfo = "**Mafia Killing** roles are the key to Mafia victory, as they are the ones performing nightly attacks. All Mafia Killing roles are unique, but non-killing mafia members may be promoted to Mafioso if there are no Mafia Killing roles alive.";
          
        } else if (rolecat == "md") { // MD list
          for (var i=0;i<roles.md.length;i++) {roledisplay += roles.md[i]+"\n";} rolecat="Mafia Deception";
          exinfo = "**Mafia Deception** roles are skilled in twisting, falsifying and destroying information in favor of the Mafia. Note that some of the Mafia Deception roles have a limited usage of their ability, so plan ahead and use wisely.";
          
        } else if (rolecat == "ms") { // MK list
          for (var i=0;i<roles.ms.length;i++) {roledisplay += roles.ms[i]+"\n";} rolecat="Mafia Support";
          exinfo = "**Mafia Support** are the ones who supports and protects the Mafia, through methods such as blackmailing and gathering information.";
          
        } else {
          for (var i=0;i<roles.mafia.length;i++) {roledisplay += roles.mafia[i]+"\n";} rolecat="Mafia"; var showcat = true;
          exinfo = "The **Mafia** is the informed minority, the Town's main opposition. All Mafia roles share the same __Goal__: They must eliminate every other faction. Everyone in the Mafia knows each other can freely communicate at any time, allowing them to make plans and systematically undermine the Town. When playing as Mafia, communication will help decide strategies.";
        }
        
        if (showcat == true) { // should the embed show a list of categories?
          const embed = new Discord.RichEmbed()
          .setColor('#b22222')
          .addField(rolecat+":", roledisplay, true)
          .addField("Categories:", "killing\ndeception\nsupport", true)
          message.channel.send({embed});
        } else {
          const embed = new Discord.RichEmbed()
          .setColor('#b22222')
          .addField(rolecat+":", roledisplay, true)
          message.channel.send({embed});
        }
        
      } else if (args[0] == "neutral" || args[0].startsWith("n")) { // arg = neutral
        if (rolecat == "nk") {
          for (var i=0;i<roles.nk.length;i++) {roledisplay += roles.nk[i]+"\n";} rolecat="Neutral Killing";
          exinfo = "All **Neutral Killing** roles have the power to directly and efficiently attack and kill other players all by themselves. Each role is it's own *faction* consisting of only that role, meaning the common __Goal__ is to eliminate every other faction.";
          
        } else if (rolecat == "ne") {
          for (var i=0;i<roles.ne.length;i++) {roledisplay += roles.ne[i]+"\n";} rolecat="Neutral Evil";
          exinfo = "**Neutral Evil** roles have one thing in common: They all oppose the Town in one way or the other, but lack the ability to freely kill anyone on their own. Due to their unique win conditions, Neutral Evil roles make good allies with other Town oppositions, though it's not impossible for roles such as the Lunatic or Bounty Hunter to help the Town after their goal is met.";
          
        } else if (rolecat == "nb") {
          for (var i=0;i<roles.nb.length;i++) {roledisplay += roles.nb[i]+"\n";} rolecat="Neutral Benign";
          exinfo = "**Neutral Benign** consists of a few roles that poses no harm towards any individual, allowing them to win with any role in the game. Despite the simple win condition, evil roles often claim themselves to be Neutral Benign, as they're usually difficult to prove and quite versatile in taking sides, making real Neutral Benign players hard to be trusted.";
          
        } else if (rolecat == "nc") {
          for (var i=0;i<roles.nc.length;i++) {roledisplay += roles.nc[i]+"\n";} rolecat="Neutral Chaos";
          exinfo = "**Neutral Chaos** roles are unbalanced just-for-fun Neutral roles meant to stir up the chaos, as the name implies. They can be harmful to all factions, as their win conditions always imply death or involuntary sacrifice of other players. However, this does not apply to all Neutral Chaos roles, as some roles such as Hitman can prove themselves to be an useful ally.";
          
        } else {
          for (var i=0;i<roles.neutral.length;i++) {roledisplay += roles.neutral[i]+"\n";} rolecat="Neutral"; var showcat = true;
          exinfo = "The **Neutrals** are third-party players, each with their own different goal to complete. Understanding how to work alone is the key to playing Neutral, as you typically will not have many natural allies. Many Neutral roles do not belong in any factions, allowing them to side with different factions as they wish; but for factional roles such as the Neutral Killing category, only one faction can win, making the battle for survival ever more important.";
          
        }
        
        if (showcat == true) { // should the embed show a list of categories?
          const embed = new Discord.RichEmbed()
          .setColor('#888888')
          .addField(rolecat+":", roledisplay, true)
          .addField("Categories:", "killing\nevil\nbenign\nchaos", true)
          message.channel.send({embed});
        } else {
          const embed = new Discord.RichEmbed()
          .setColor('#888888')
          .addField(rolecat+":", roledisplay, true)
          message.channel.send({embed});
        }
        
      } else if (args[0] == "cult" || args[0].startsWith("c")) { // arg = neutral
        if (rolecat == "ck") {
          for (var i=0;i<roles.ck.length;i++) {roledisplay += roles.ck[i]+"\n";} rolecat="Cult Killing";
          exinfo = "...";
          
        } else if (rolecat == "cc") {
          for (var i=0;i<roles.cc.length;i++) {roledisplay += roles.cc[i]+"\n";} rolecat="Cult Conversion";
          exinfo = "...";
          
        } else if (rolecat == "cs") {
          for (var i=0;i<roles.cs.length;i++) {roledisplay += roles.cs[i]+"\n";} rolecat="Cult Support";
          exinfo = "...";
          
        } else {
          for (var i=0;i<roles.cult.length;i++) {roledisplay += roles.cult[i]+"\n";} rolecat="Cult"; var showcat = true;
          exinfo = "...";
          
        }
        
        if (showcat == true) { // should the embed show a list of categories?
          const embed = new Discord.RichEmbed()
          .setColor('#e066ff')
          .addField(rolecat+":", roledisplay, true)
          .addField("Categories:", "killing\nconversion\nsupport", true)
          message.channel.send({embed});
        } else {
          const embed = new Discord.RichEmbed()
          .setColor('#e066ff')
          .addField(rolecat+":", roledisplay, true)
          message.channel.send({embed});
        }
        
      } else if (args[0] == "unique" || args[0].startsWith("u")) { // arg = UNIQUE
        if (rolecat == "ut") {
          for (var i=0;i<roles.ut.length;i++) {roledisplay += roles.ut[i]+"\n";} rolecat="Unique Town Roles";
          exinfo = "Each **Unique Town role** can only be held by one player in the entire game. Amnesiacs may not become a Unique Town role. Furthermore, Marshall and Mayor can *never* be in the same game.";
        } else if (rolecat == "um") {
          for (var i=0;i<roles.um.length;i++) {roledisplay += roles.um[i]+"\n";} rolecat="Unique Mafia Roles";
          exinfo = "**Unique Mafia roles** have one thing in common: They all possess killing abilities. The Mafia promotion system allows non-unique Mafia roles to become Mafioso if there are no Mafia Killing roles left alive, and Amnesiacs can also remember as Unique Mafia roles if there are no players alive with said role.";
        } else if (rolecat == "un") {
          for (var i=0;i<roles.un.length;i++) {roledisplay += roles.un[i]+"\n";} rolecat="Unique Neutral Roles";
          exinfo = "Amnesiacs can remember as **Unique Neutral roles** if there are no players alive with said role.";
          
        /*} else if (rolecat == "uc") {
          for (var i=0;i<roles.uc.length;i++) {roledisplay += roles.uc[i]+"\n";} rolecat="Unique Cult Roles";
          exinfo = "Similar to Mafia, **Unique Cult roles** are all Cult Killing roles. Unlike the Mafia, the Cult does not possess any promotion system, but the Cult can continue to kill without killing roles by spending souls. Amnesiacs are able to remember as Unique Cult roles.";*/
          
        } else {
          for (var i=0;i<roles.unique.length;i++) {roledisplay += roles.unique[i]+"\n";} rolecat="All Unique Roles";
          exinfo = "**Unique roles** are roles that can only appear once in the role list. However, Amnesiacs can become a unique non-Town role, and the Mafia's promotion system allows non-unique Mafia members to succeed killing roles.";
        }
      
        const embed = new Discord.RichEmbed()
        .setColor('#00d9d9')
        .addField(rolecat+":", roledisplay, true)
        message.channel.send({embed});
        
      
      } else if (args[0] == "factional" || args[0] == "f") {
        for (var i=0;i<roles.factional.length;i++) {roledisplay += roles.factional[i]+"\n";} rolecat="Factions";
        exinfo = "All **Factions** share the same __Goal__: They must eliminate every other faction that isn't their own, meaning they can never win with each other. The game officially ends when only one faction is left alive. Roles that are not listed here are considered **Non-factional**, which means the game will play and end with no regard to them.";
        
        const embed = new Discord.RichEmbed()
        .setColor('#00d9d9')
        .addField("Factional Roles:", roledisplay, true)
        message.channel.send({embed});
        
        
      } else if (args[0] != null && rolecat != "help") {
        message.channel.send(":warning: That faction doesn't seem to exist.");
      }
      
      if (exinfo != "" && exarg == "info") {
        message.channel.send(exinfo);
      }
}