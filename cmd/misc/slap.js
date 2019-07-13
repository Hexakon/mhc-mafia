exports.run = (client, message, args) => {
  const inout = require("./../../inout.json");
  const flavor = inout.slap
  const error = "held their hand up for a few seconds, then slapped themselves across the face."
  const action = [":raised_hand:","slapped",""]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
