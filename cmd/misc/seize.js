exports.run = (client, message, args) => {
  const inout = require("./../inout.json");
  const flavor = [""]
  const action = ["<:communism:445185741530726410>","wants to seize the means of production!"]

  try {
    let cmdFile = require(`./../group/self.js`);
    cmdFile.run(client, message, args, flavor, action);
  } catch (err) {
    console.error(err);
  }

}
