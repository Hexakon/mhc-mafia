exports.run = (client, message, args) => {
    const $inout = require.main.require("./const/inout.json");
    const flavor = $inout.vibecheck
    const error = "checked their own vibe. Seems like they're vibing."
    const action = [":hammer:","performed a vibe check on",""]
  
    try {
      let cmdFile = require(`./../group/interact.js`);
      cmdFile.run(client, message, args, flavor, error, action);
    } catch (err) {
      console.error(err);
    }
  
  }