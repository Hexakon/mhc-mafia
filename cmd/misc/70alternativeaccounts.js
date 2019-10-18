exports.run = (client, message, args) => {
    const flavor = [""]
    const action = [":egg:","has *seventy* alternative accounts!!!"]
  
    try {
      let cmdFile = require(`./../group/self.js`);
      cmdFile.run(client, message, args, flavor, action);
    } catch (err) {
      console.error(err);
    }
  
  }