module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  
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
    if (userData.has(`${element.ID}.chess.elo`)) {
      tempData1 = element.ID.replace("u", "");
      array2[i] = tempData1;
      tempData2 = element.data.chess.elo;
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
  
  return message.channel.createMessage({
    embed: {
      title: "**Astolfo Chess Leaderboard**",
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
          value: `Rating: ${array35[indices[0]]}`
        },
        {
          name: `**2. ${secondUser.tag}**`,
          value: `Rating: ${array35[indices[1]]}`
        },
        {
          name: `**3. ${thirdUser.tag}**`,
          value: `Rating: ${array35[indices[2]]}`
        }
      ]
    }
  });
};
module.exports.config = {
  name: "chesstop",
  aliases: ["chesslb", "chtop"],
  description: "View the chess leaderboard"
};