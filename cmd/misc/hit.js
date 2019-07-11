exports.run = (client, message, args) => {
  const inout = require("./../inout.json");
  const flavor = inout.hit
  const error = "threw a punch at thin air, probably to hit some otherworldly being."
  const action = [":punch:","hit",""]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
