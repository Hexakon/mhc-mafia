exports.run = (client, message, args) => {
  const fs = require('fs');
  const dataAT = require("./../data/attri.json");
  const dataAT_fn = __dirname + "/../data/attri.json";
  
  if (message.member.roles.find("name", "Host")) {
    
    if (args[0] != message.mentions.members.first() || args[0] === undefined) {
      message.channel.send(":warning: **Invalid stasis target!**");
    } else {
      
      async function stasis() {
        
        
        let stasis = new Object; // Container of stasis notice details.
        
        stasis.target = args[0]; // {"target": "content of args[0]"}
        stasis.reason = new Array; // {"reason": ["reason 1", "reason 2", "etc."]}
      
        message.channel.send(":classical_building: **Preparing stasis notice for "+args[0]+".** Input `exit` (lowercase) at any part to cancel the operation.");
      
        
        const filter = m2 => m2.author.id === message.author.id; // filter object for all inputs in the sequence
        let exit = false; // exit boolean for if the function should be stopped early.
        const rules = ["Disrespectful or deliberately inciting remarks. (Global rule 1)","Secretly providing players with game information. (Rule 1)","Taking and sharing screenshots related to the game. (Rule 2)","Copying or reuploading your role card or system messages. (Rule 3)","Discussing about the game outside of the server. (Rule 4)","Gamethrowing. (Rule 5)","Metagaming. (Rule 6)","Modifying messages post mortem. (Rule 7)"]; // rule sheet for stasis reason.
        
      
        // PART 1: STASIS LENGTH
        await message.channel.send(":arrow_right: **How many games should the recipient remain in stasis?**");
        
        await message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
          .then(res => {
            if (res.first() == "exit") {
              console.log("Operation stopped!");
              message.channel.send(":stop_button: **Operation cancelled manually.**");
              exit = true;
            } else if (isNaN(parseInt(res.first(), 10))) {
              message.channel.send(":stop_button: **Operation cancelled automatically:** Invalid integer input.");
              exit = true;
            } else {
              stasis.gamecount = res.first();
              message.channel.send(":white_check_mark: Stasis length set to **"+res.first()+"** game(s).");
            }
          })
          .catch(res => {
            message.channel.send(":warning: **Request timed out.** (30 seconds)");
            exit = true;
          })
        
        if (exit==true) {
          return;
        }
        
        // PART 2: GAME NUMBER IN QUESTION.
        await message.channel.send(":arrow_right: **What game does the stasis notice apply to?**");
        
        await message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
          .then(res => {
            if (res.first() == "exit") {
              console.log("Operation stopped!");
              message.channel.send(":stop_button: **Operation cancelled manually.**");
              exit = true;
            } else if (isNaN(parseInt(res.first(), 10))) {
              message.channel.send(":stop_button: **Operation cancelled automatically:** Invalid integer input.");
              exit = true;
            } else {
              stasis.gamenumber = res.first();
              message.channel.send(":white_check_mark: Stasis notice now applies to **Game "+res.first()+"**.");
            }
          })
          .catch(res => {
            message.channel.send(":warning: **Request timed out.** (30 seconds)");
            exit = true;
          })
        
        if (exit==true) {
          return;
        }
        
        // PART 3: PRIMARY STASIS REASON
        await message.channel.send(":arrow_right: **Stasis reason?** Input rule number to reference an *ingame* rule.");
        
        await message.channel.awaitMessages(filter, { maxMatches: 1, time: 40000, errors: ['time'] })
          .then(res => {
            if (res.first() == "exit") {
              console.log("Operation stopped!");
              message.channel.send(":stop_button: **Operation cancelled manually.**");
              exit = true;
            } else if (isNaN(parseInt(res.first(), 10)) == false && parseInt(res.first(), 10) < rules.length+1) {
              stasis.reason.push(rules[res.first()]);
              message.channel.send(":white_check_mark: Stasis reason set to **\""+rules[res.first()]+"\"**.");
            } else {
              stasis.reason.push(res.first());
              message.channel.send(":white_check_mark: Stasis reason set to **\""+res.first()+"\"**.");
            }
          })
          .catch(res => {
            message.channel.send(":warning: **Request timed out.** (40 seconds)");
            exit = true;
          })
        
        if (exit==true) {
          return;
        }
        
        let addition = true
        
        // PART 4: ADDITIONAL STASIS REASONS
        while (addition==true) {
          await message.channel.send(":arrow_right: **Additional reasons?** Optional. Input `stop` to skip or finish.");
        
          await message.channel.awaitMessages(filter, { maxMatches: 1, time: 40000, errors: ['time'] })
            .then(res => {
              if (res.first() == "exit") {
                console.log("Operation stopped!");
                message.channel.send(":stop_button: **Operation cancelled manually.**");
                addition = false;
                exit = true;
              } else if (res.first() == "stop") {
                message.channel.send(":white_check_mark: **Stasis reason list has been completed.**");
                addition = false;
              } else if (isNaN(parseInt(res.first(), 10)) == false && parseInt(res.first(), 10) < rules.length+1) {
                stasis.reason.push(rules[res.first()]);
                message.channel.send(":white_check_mark: Stasis reason **\""+rules[res.first()]+"\"** added.");
              } else {
                stasis.reason.push(res.first());
                message.channel.send(":white_check_mark: Stasis reason **\""+res.first()+"\"** added.");
              }
            })
            .catch(res => {
              message.channel.send(":warning: **Request timed out.** (40 seconds)");
              addition = false;
              exit = true;
            })
        }
        
        if (exit==true) {
          return;
        }
        
        // PART 5: PREVIEW
        let list = "";
        for (let i=0; i<stasis.reason.length; i++) {
          list = list + "\n- *" + stasis.reason[i] + "*";
        }
        
        let notice = ":classical_building: **GAME STASIS NOTICE** (Mayhem City: Mafia)\n\nYou have been placed in game stasis for **"+stasis.gamecount+"** game(s) due to your behavior in Game "+stasis.gamenumber+":"+list+"\n\nIf you believe this is a mistake, do not hesitate to make an appeal to the hosts.\nThank you for your cooperation."
        
        await message.channel.send(":arrow_right: **Stasis preview:**\n\nRecipient: "+message.mentions.members.first()+"\n----- BEGIN MESSAGE -----\n\n"+notice+"\n\n----- END MESSAGE -----\n\n Input `confirm` (lowercase) to send the stasis notice.\nInput `exit` (lowercase) to cancel the operation.");
        
        await message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
          .then(res => {
            if (res.first() == "exit") {
              console.log("Operation stopped!");
              message.channel.send(":stop_button: **Operation cancelled manually.**");
            } else if (res.first() == "confirm") {
              message.mentions.members.first().send(notice);
              message.channel.send(":white_check_mark: **Stasis notice sent to "+args[0]+"!**");
            } else {
              message.channel.send(":stop_button: **Operation cancelled automatically:** Unrecognized input.");
            }
          })
          .catch(res => {
            message.channel.send(":warning: **Request timed out.** (30 seconds)");
          })
        
      }
      
      // call for the function to be run after defining it
      stasis();
      
    }
  }
}