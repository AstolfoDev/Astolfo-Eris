module.exports.run = async (client, message, args, user) => {
  
  let db = require("betterqdb");
  const ReactionHandler = require('eris-reactions');
  let userData = new db.table("user");
  let check = async (success) => {
    if (success == "time") return
    if (success == false) {
      let loseMoney = [Math.floor(Math.random()*3)];
      if (loseMoney == 0) {
        message.channel.createMessage(`u failed but managed to escape!`);
      } else {
        let balance = userData.get(`u${message.author.id}.cr`);
        let sunkCost = [Math.floor(Math.random()*balance)];
        let cut = [Math.floor(Math.random()*sunkCost)];
        message.channel.createMessage(`🚔 **weeeewooo!** the pawlice caught uw and u lost ${sunkCost} cwedits!! ${user[0].mention} also recieved ${cut} cweddddits compwensationzzz!!`);
        userData.subtract(`u${message.author.id}.cr`, sunkCost)
        userData.add(`u${user[0].id}.cr`, cut);
      };
      return;
    };
    await work();
  };
  let work = async () => {
    var multiplier = userData.get(`u${user[0].id}.cr`);
    
    var salary = [Math.floor(Math.random()*multiplier)];
    
    message.channel.createMessage({
        embed: {
          title: "**Robbery Complete!**",
          color: 0xde1073,
          description: `You robbed ${user[0].mention} and earned ${salary} credits!`,
          thumbnail: {
            url: "https://cdn.discordapp.com/attachments/684116195841933352/712144730968031324/image0.jpg"
          },
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          footer: {
            text: "Astolfo.js",
            icon_url: client.user.avatarURL
          }
        }
    });
  
    userData.add(`u${message.author.id}.cr`, salary);
    userData.subtract(`u${user[0].id}.cr`, salary);
  }
  
  let game1 = new Promise( async (resolve, reject) => {

      resolve("uhhh");
      var filter = m => m.author.id === message.author.id;
      

      var answer;
      var emojis = ["💵","💸","💰","💴","💷","💶","💎","🖥","💻","🔑"];
      let chosen = [];
      chosen[0] = [Math.floor(Math.random()*emojis.length)];
      let picked = emojis[chosen];
      
      let number = 0;
      
      for (let i=1; i < 5; i++) {
        number = Math.floor(Math.random()*emojis.length);
        while (chosen.includes(number)) {
          number = Math.floor(Math.random()*emojis.length);
        };
        chosen[i] = number;
      };
      
      let newChosen = [];
      for (let i=0; i < chosen.length; i++) {
        number = Math.floor(Math.random()*chosen.length);
        while (newChosen.includes(number)) {
          number = Math.floor(Math.random()*chosen.length);
        };
        newChosen[i] = number;
      };
      
      message.channel.createMessage(`<:astolfoHappy:683035783963082797> **oooooooooh!** react with: ${picked}\n🕐 You have **5 seconds!**`).then(
        
        
        async msg => {
        
        for (let i=0; i<newChosen.length;i++) {
          msg.addReaction(emojis[chosen[newChosen[i]]]);
        }
        msg.addReaction(picked);
        var success = true;
        answer = await ReactionHandler.collectReactions(msg, (userID) => userID === message.author.id, { maxMatches: 1, time: 5000 });
        
        if (!answer[0]) {
          msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** get faster!!`);
          return;
        }

        if (answer[0].emoji.name != picked) {

          msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** you picked da wrong item!!!`);
          success = false;
        }

        /* Oh yeah, robberies *ARE* rigged
           You can't rob me or emortal lmfao
           get dunked on depresso looooooooooooooool */
        if ((success == true && [Math.floor(Math.random()*2)] == 1) || (user[0].id == "193044575500238849" || user[0].id == "261498586611712000")) return message.channel.createMessage(`${user[0].mention} left their wallet at home so you were unable to rob them!!!`)

        await check(success);
        return

      })
  })
};