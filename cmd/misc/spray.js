exports.run = (client, message, args) => {
  const inout = require("./../inout.json");
  const flavor = inout.spray
  const error = "sprayed some water at a nearby plant to make sure it is hydrated."
  const action = ["<:spray:513131412224999434>","sprayed water at",""]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
