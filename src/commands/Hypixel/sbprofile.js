module.exports.run = async (client, message, args) => {
  
  var playerName = args[0];
  let info;
  let success = async () => {
    message.channel.createMessage({
      embed: {
        title: `${playerName}'s Profile`,
        thumbnail: { url: `https://minotar.net/avatar/${playerName}` },
        color: 0xde1073,
        description: `${result}`
      }
    });
  };
  let result;
  var coinPurse;
  var bankBal;
  var armour = "";
  var id;
  
  const https = require('https');
  
  https.get(`https://api.slothpixel.me/api/skyblock/profile/${playerName}`, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    try {
      info = JSON.parse(data);
    }
    catch (err) {
      throw "unable to parse"
    }
    if (info.error) {
      result = info.error
      return success();
    }
    id = info.profile_id;
    info = info.members;

    console.log(info.id.player)
    
    success();
    //console.log(info.armor)
    console.log(id)
    return console.log(info);
  });
    
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    return;
  });
  
  
};
module.exports.config = {
  name: "sbprofile",
  aliases: ["sbp"],
  description: "View your Hypixel Skyblock profile!"
};