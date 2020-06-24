module.exports.run = async (client, message, args, purple) => {
  
  let db = require("betterqdb");
  const ReactionHandler = require('eris-reactions');
  let userData = new db.table("user");
  let pizzaData = new db.table("pizza");
  const show = require("../Functions/show.js");
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
      };
      return;
    };
    await work();
  };
  let work = async () => {
    var multiplier = pizzaData.get(`u${message.author.id}.funfactor`)*1000.57653791130186;
    console.log(multiplier);
    var salary = parseInt(parseInt(Math.floor(Math.random()*multiplier))+500);
    var pizzaria;
    var fees = 0;
    if (purple == true) {
      pizzaria = pizzaData.get(`u${message.author.id}.room`).replace("pgG", "chH").replace("sgG","chH");
      fees = [Math.floor(Math.random()*salary)];
      message.channel.createMessage(`a child went missing... ${fees} cweddits were deducted from your salary in legal fees`);
    } else {
      pizzaria = pizzaData.get(`u${message.author.id}.room`);

    };

    salary = salary - fees;

    show.run(message, pizzaria);
    
    userData.add(`u${message.author.id}.cr`, salary);
    
    message.channel.createMessage({
        embed: {
          title: "**Shift Complete!**",
          color: 0xde1073,
          description: `You worked the day shift and earned ${salary} credits!`,
          thumbnail: {
            url: "https://i.ytimg.com/vi/iMuMiolkG9c/maxresdefault.jpg"
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
  }
  
  let game1 = new Promise( async (resolve, reject) => {

      resolve("uhhh");
      var filter = m => m.author.id === message.author.id;
      

      var answer;
      var emojis = ["🥪","🍟","🌮","🌯","🌭","🍕","🍔","🍿","🥤","🥛","🧇","🥞","🍝","🍩","🍭","🍫","🍬"];
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
      
      message.channel.createMessage(`<:freddycove:712668930635989063> **oooooooooh!** deliver the customer's order: ${picked}\n🕐 You have **10 seconds!**`).then(
        
        
        async msg => {
        
        for (let i=0; i<newChosen.length;i++) {
          msg.addReaction(emojis[chosen[newChosen[i]]]);
        }
        msg.addReaction(picked);
        var success = true;
        answer = await ReactionHandler.collectReactions(msg, (userID) => userID === message.author.id, { maxMatches: 1, time: 10000 });
        
        if (typeof answer[0].emoji.name == undefined) {
          msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** get faster!!`);
          return;
        }

        if (answer[0].emoji.name != picked) {

          msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** you picked da wrong item!!!`);
          success = false;
        }
        await check(success);
        return

      })
  })
};