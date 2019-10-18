exports.run = (client, message, args) => {
  const $inout = require.main.require("./const/inout.json");
  const flavor = $inout.calloutpost
    const action = [":keyboard:","just made a call out post on their"]
  
    try {
      let cmdFile = require(`../group/self.js`);
      cmdFile.run(client, message, args, flavor, action);
    } catch (err) {
      console.error(err);
    }
  
  }