exports.run = (client, message, args) => {
  const inout = require("./../inout.json");
  const flavor = inout.hug
  const error = "attempted to hug the air, to no particular success."
  const action = [":hugging:","hugged",""]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
