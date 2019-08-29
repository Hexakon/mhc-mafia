exports.run = (client, message, args) => {
  const fs = require('fs')
  const $function = require.main.require("./const/function.js");

  var path = args[0]
  var pathArray = path.split(".")
  var newData = args[1]

  if (fs.existsSync('./data/'+pathArray[0].slice(4).toLowerCase()+'.json')) {
    eval("const "+pathArray[0]+" = require.main.require('./data/"+pathArray[0].slice(4).toLowerCase()+".json')");
    eval("const fn = process.cwd() + '/data/"+pathArray[0].slice(4).toLowerCase()+".json'");

    if (newData !== undefined) { // if there is edit being made, aka edit mode

      eval(path + " = " + newData)

      message.channel.send("`"+path+"` has been changed to `"+newData+"`.")

      eval("$function.writeFile(fn, "+pathArray[0]+")")

    } else { // if there is no edit being made, aka view mode

      message.channel.send("`"+path+"` is currently set to `"+JSON.stringify(eval(path))+"`.")
      
    }

  } else { // if path does not exist
    message.channel.send("`"+path+"` does not exist.")
  }

}
