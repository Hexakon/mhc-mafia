exports.run = (client, message, args) => {
  const $inout = require.main.require("./const/inout.json");
  const flavor = $inout.pat
  const error = "patted... something."
  const action = ["<:headpat:577941310082646037>","patted"," on the head"]

  try {
    let cmdFile = require(`./../group/interact.js`);
    cmdFile.run(client, message, args, flavor, error, action);
  } catch (err) {
    console.error(err);
  }

}
