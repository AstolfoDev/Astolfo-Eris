module.exports.run = async (client, message, args) => {
  
  let db = require("betterqdb");
  let userData = new db.table("user");
  let check = async (success) => {
    if (success == "time") return
    if (success == false) return message.channel.createMessage(`u failed! so u did not earn any money`); 
    await work();
  };
  let work = async () => {
    var jobs = ["discord bot developer"];
    var index = [Math.floor(Math.random()*jobs.length)];
    var an = "a";
    var job = jobs[index];
    if (job[0].toLowerCase() == "a" || job[0] == "e" || job[0] == "i" || job[0] == "o" || job[0] == "u") an = "an";
    var multiplier = 500;
    var coronaBonus = args.join(" ").toLowerCase();
    var coronaText = "";
    if (coronaBonus == "from home") {
      multiplier = 1000;
      coronaText = "**[Corona Bonus]:** x2 moneeeeeeeeey 4 working @ hoOooOme!1!1!";
    }
    var salary = [Math.floor(Math.random()*multiplier)];
    
    message.channel.createMessage({
        embed: {
          title: "**Work Complete!**",
          color: 0xde1073,
          description: `You worked as ${an} \`${job}\` and earned ${salary} credits!\n${coronaText}`,
          thumbnail: {
            url: "https://media.tenor.com/images/fa4a5706dc9261ec7dd3277d47200c2d/tenor.gif"
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
  }
  
  let game1 = new Promise( async (resolve, reject) => {
    
      resolve("bruh");
      var filter = m => m.author.id === message.author.id;
      var words = ["console.log(err);","m.channel.createMessage('hello!');","client.users.get(id);","let bruh = \"moment\";","for (let i=0;i<array.length;i++)","const config = require('./config.json');"];
      var i = [Math.floor(Math.random()*words.length)];
      var word = words[i];

      var answer;
      var success = true;
      
      message.channel.createMessage(`<:astolfoHappy:683035783963082797> **ooOoh wOahhh!** write this code for my next update: \`${word}\`\n🕐 You have **30 seconds!**`).then(
        
        
        async msg => {
        
        answer = await message.channel.awaitMessages(filter, { time: 30000, maxMatches: 1 });
        if (!answer[0]) {
          msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** better brush up those programming skillz...`);
          return;
        }

        if (answer[0].content.toLowerCase() != word.toLowerCase()) {

          msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** dat iz not da code i needed!!!`);
          success = false;
        }
        await check(success);
        return

      })
  })
};