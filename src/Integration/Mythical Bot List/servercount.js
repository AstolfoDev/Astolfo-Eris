module.exports.run = async (client) => {
  const needle = require('needle');
  
  let url = "https://mythicalbots.xyz/api/bot/682220266901733381";
  
  let options = {
    headers: {
      'Content-Type': "application/json",
      'authorization': "bitch YOU THOUGHT"
    }
  };
  let prefix = "[Mythical Bot List] ";
  
  needle.post(url, {server_count: client.guilds.size}, options, 
    function(err, resp, body){
      switch (typeof body.success === undefined) {
        case true:
          console.log(prefix+body.error);
          break;
        case false:
          console.log(prefix+body.success);
          break;
      };
    });
  

};