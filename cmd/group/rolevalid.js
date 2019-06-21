module.exports = function (role) {

  const roles = require("./../roles.json"); // requiring the list of unique roles.

  let list = Object.keys(dataRL).filter(key => dataRL[key] === role); // get the alphabetical ID list of players who has the role 'role'.

  if (roles.unique.includes(role)) { // if role is unique, output string. if not, output array. This is to separate unique and non-unique usage more easily.
    return list[0];
  } else {
    return list;
  }

};
