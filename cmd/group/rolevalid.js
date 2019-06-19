module.exports = {

  check(role): function (role) {
    let list = Object.keys(dataRL).filter(key => dataRL[key] === role);

    if (list.length === 1) {
      return list[0];
    } else {
      return list;
    }
  }

};
