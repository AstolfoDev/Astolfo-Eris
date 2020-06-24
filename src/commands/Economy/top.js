module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  
  var type = args[0];
  var currency;
  var currencyName;
  
  if (!type) return message.channel.createMessage(`pls specify the currency you want to check the leaderboard for! (cr/tc)\n\`Ex: /leaderboard credits\``);
  
  type = type.toLowerCase();
  
  if (type == "cr" || type == "credits" || type == "credit") {
    currency = "cr";
    currencyName = "credit";
  } else if (type == "at" || type == "token" || type == "tokens" || type == "t" || type == "apocrypha token" || type == "apocrypha tokens") {
    currency == "at";
    currencyName == "Apocrypha Token"
    return;
  } else if (type == "tc" || type == "trap coin" || type == "trapcoin" || type == "trapcoins" || type == "trap coins") {
    currency = "tc";
    currencyName = "Trap Coin";
  } else return message.channel.createMessage(`invalid currency!! pls choose cr or tc!!!`);
  
  var array1 = userData.all();
  var tempData1;
  var tempData2;
  var array2 = [];
  var array3 = [];
  var array35 = [];
  var array4 = [];
  var indices = [];
  let i = 0;
  let y = 0;
  for (element of array1) {
    if (userData.has(`${element.ID}.${currency}`)) {
      tempData1 = element.ID.replace("u", "");
      array2[i] = tempData1;
      if (currency == "cr") {
        tempData2 = element.data.cr;
      } else if (currency == "at") {
        tempData2 = element.data.at
      } else if (currency == "tc") {
        tempData2 = element.data.tc
      };
      array3[i] = tempData2;
      array35[i] = tempData2;
      array4[i] = tempData2;
      i++
    }
  }
    
  array4.sort((a, b) => b - a);
    
  indices[0] = array3.indexOf(array4[0])
  array3[indices[0]] = "Nobody"
    
  indices[1] = array3.indexOf(array4[1])
  array3[indices[1]] = "Nobody"
    
  indices[2] = array3.indexOf(array4[2])
  array3[indices[2]] = "Nobody"
    
    
  
  const firstUser = client.users.get(array2[indices[0]]);
  const secondUser = client.users.get(array2[indices[1]]);
  const thirdUser = client.users.get(array2[indices[2]]);
  
  let formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return message.channel.createMessage({
    embed: {
      title: `**${currencyName} Leaderboard**`,
      color: 0xde1073,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: `**1. ${firstUser.tag}**`,
          value: `Balance: ${formatNumber(Math.floor(array35[indices[0]]))} ${currency.toUpperCase()}`
        },
        {
          name: `**2. ${secondUser.tag}**`,
          value: `Balance: ${formatNumber(Math.floor(array35[indices[1]]))} ${currency.toUpperCase()}`
        },
        {
          name: `**3. ${thirdUser.tag}**`,
          value: `Balance: ${formatNumber(Math.floor(array35[indices[2]]))} ${currency.toUpperCase()}`
        }
      ]
    }
  });
};
module.exports.config = {
  name: "top",
  aliases: ["lb", "leaderboard"],
  description: "View the leaderboards"
};