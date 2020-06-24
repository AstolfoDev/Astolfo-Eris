module.exports.run = async (client, msg, args) => {
  const db = require("betterqdb");
  let userData = new db.table("user");
  
  let splitter = "<a:flashy_dance:670802681572491288>"
  let message = msg;
  let casesen = message.content.toLowerCase()
  let parts = casesen.split(splitter);
  
  var identifier = parts[0];
  var type = parts[1];
  var command = parts[2];
  var userID = parts[3];
  var amount = parseFloat(parts[4]);
  var currency = parts[5]
  
  try {
    if (command == "give") {

       if (!userData.has(`u${userID}`)) {
        throw "invalid_user(noData)";
      }
      if (currency != "cr" && currency != "at" && currency != "tc") {
        throw "invalid_currency";
      }
      
     // if (isNaN(parseInt(amount)) === true) {
    //    throw "amount_is_NaN";
      
      if (currency == "cr") {
        userData.add(`u${userID}.cr`, amount);
        message.channel.createMessage(`${identifier}${splitter}anw${splitter}give`)
      }
      if (currency == "tc") {
        userData.add(`u${userID}.tc`, amount)
        message.channel.createMessage(`${identifier}${splitter}anw${splitter}give`)
      }
      if (currency == "at") {
        userData.add(`u${userID}.at`, amount);
        message.channel.createMessage(`${identifier}${splitter}anw${splitter}${command}`)
      }       
    }
    else if (command == "wallet") {
      cr = await userData.get(`u${userID}.cr`)
      tc = await userData.get(`u${userID}.tc`);
      at = await userData.get(`u${userID}.at`);
      
      message.channel.createMessage(`${identifier}${splitter}anw${splitter}${command}${splitter}${cr}${splitter}${tc}${splitter}${at}`)
    }
    else if (command == "ping") {
      message.channel.createMessage(`${identifier}${splitter}anw${splitter}${command}`)
    }
    else if (command == "set") {
        if (isNaN(parseInt(userID)) === true) {
          return
        }
      
      
        userData.set(`u${userID}.${currency}`, amount);
      
        message.channel.createMessage(`${identifier}${splitter}anw${splitter}${command}`)
    }
    else if (command == " ") {
      throw "missimg_command"
    }
    else {
      throw "unknown_command"
    }
   } catch (err) {
    if (err.message == undefined) {
      message.channel.createMessage(`${identifier}${splitter}anw${splitter}error${splitter}${err}`)
    } else {
      err_m = err.message.replace("https://", "")
      err_m = err_m.replace("discord.gg/", "")
      message.channel.createMessage(`${identifier}${splitter}anw${splitter}error${splitter}${err_m}`)
    }
    throw err
    
  }
};