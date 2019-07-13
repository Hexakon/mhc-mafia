exports.run = (client, message, args) => {
  const inout = require("./../../inout.json");
  const flavor = inout.handshake
  const error = "held their hand forward to shake apparently nothing."
  const action = [":handshake:","shook hands with",""]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
