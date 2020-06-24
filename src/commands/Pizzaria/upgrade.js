module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  let pizzaData = new db.table("pizza");
  let userData = new db.table("user");
  const ReactionHandler = require("eris-reactions");
  const show = require("./Functions/show.js");

  //if (message.author.username != "agent") return;
  if (!pizzaData.has(`u${message.author.id}.room`)) {
    message.channel.createMessage("u have no pizzaria, lemme make one for you...");
    pizzaData.set(`u${message.author.id}.room`, "tlLc22esSc22c22tlL\ntlLc11mgGc11c11tlL\ntlLtlLtlLtlLtlLtlL\npgGtlLtlLtlLtlLtlL")
    pizzaData.set(`u${message.author.id}.funfactor`, 10)
  }
  let upgrades = [];
  let upID = [];
  let emotes = ["uno:686689590873948226","dos:686689645131726857","tres:686689682377015354","quatro:686689729835565111","cinqo:686689779684737086","ses:686689849650053137","siette:686689888237912107","ojo:686689933569949707"]
  if (!pizzaData.has(`u${message.author.id}.1`)) {
    upgrades.push("Upgrade Animatronic - **17,500 Credits**");
    upID.push("1");
  };
  if (!pizzaData.has(`u${message.author.id}.2`)) {
    upgrades.push("Purchase Table - **5,000 Credits**");
    upID.push("2");
  };
  if (!pizzaData.has(`u${message.author.id}.3`)) {
    upgrades.push("Upgrade Security - **20,000 Credits**");
    upID.push("3");
  };
  if (pizzaData.has(`u${message.author.id}.1`) && pizzaData.has(`u${message.author.id}.2`) && pizzaData.has(`u${message.author.id}.3`)) {
    if (!pizzaData.has(`u${message.author.id}.4`)) {
      upgrades.push("Purchase Freddy Fazbear - **50,000 Credits**");
      upID.push("4");
    };
    if (!pizzaData.has(`u${message.author.id}.5`)) {
      upgrades.push("Purchase Balloons - **20,000 Credits**");
      upID.push("5");
    };
    if (pizzaData.has(`u${message.author.id}.4`) && pizzaData.has(`u${message.author.id}.5`)) {
      if (!pizzaData.has(`u${message.author.id}.6`)) {
        upgrades.push("Upgrade Stage - **150,000 Credits**");
        upID.push("6");
      };
      if (!pizzaData.has(`u${message.author.id}.7`)) {
        upgrades.push("Purchase Extra Balloons - **15,000 Credits**");
        upID.push("7");
      };
      if (!pizzaData.has(`u${message.author.id}.8`)) {
        upgrades.push("Purchase Second Table - **25,000 Credits**");
        upID.push("8");
      };
      if (pizzaData.has(`u${message.author.id}.6`) && pizzaData.has(`u${message.author.id}.7`) && pizzaData.has(`u${message.author.id}.8`)) {
        if (!pizzaData.has(`u${message.author.id}.9`)) {
          upgrades.push("Purchase Bonnie the Bunny - **7,500,000 Credits**");
          upID.push("9");
        };
        if (!pizzaData.has(`u${message.author.id}.10`)) {
          upgrades.push("Upgrade Stage - **10,000,000 Credits**");
          upID.push("10");
        };
        if (pizzaData.has(`u${message.author.id}.9`) && pizzaData.has(`u${message.author.id}.10`)) {
          if (!pizzaData.has(`u${message.author.id}.11`)) {
            upgrades.push("Repair Foxy the Pirate - **50,000,000 Credits**");
            upID.push("11")
          };
          if (!pizzaData.has(`u${message.author.id}.12`)) {
            upgrades.push("Purchase Chica the Chicken - **250,000,000 Credits**");
            upID.push("12")
          };
          if (pizzaData.has(`u${message.author.id}.11`) && pizzaData.has(`u${message.author.id}.12`)) {
            if (!pizzaData.has(`u${message.author.id}.13`)) {
              upgrades.push("Purchase Arcade Machines - **500,000,000 Credits**");
              upID.push("13")
            } else {
              return message.channel.createMessage(`**Congwaduwuationzzz!** You've maxed out ur pizzaria!!11!!`)
            };
          };
        };
      };
    };
  }
  let canAfford = () => {
    let balance = userData.get(`u${message.author.id}.cr`);
    if (balance < price) {
      message.channel.createMessage(`Sorry ${message.author.mention}!!!11! uwe canz not afford this item!!!`);
      return false;
    };
    userData.subtract(`u${message.author.id}.cr`, parseInt(price));
    message.channel.createMessage(`successfuwully bowought ${thingName}!`);
    return true;
  };
  let up = [];
  let num;
  var price;
  var thingName;
  for (let i=0;i<upgrades.length;i++) {
    up.push(`${i+1}. ${upgrades[i]}`);
    num += 1;
  }
  message.channel.createMessage(`**Available Upgrades**\n${up.join("\n")}`).then(async msg => {
    for (let i=0;i<up.length;i++) {
      msg.addReaction(emotes[i]);
    };
    let answer = await ReactionHandler.collectReactions(msg, (userID) => userID === message.author.id, { maxMatches: 1, time: 300000});
    let chosen;
    let name = answer[0].emoji.name;
    if (answer[0].emoji.name == "uno") {
      chosen = 0;
    } else if (name == "dos") {
      chosen = 1;
    } else if (name == "tres") {
      chosen = 2;
    } else if (name == "quatro") {
      chosen = 3;
    } else if (name == "cinqo") {
      chosen = 4;
    } else if (name == "ses") {
      chosen = 5;
    } else if (name == "siette") {
      chosen = 6;
    } else if (name == "ojo") {
      chosen = 7;
    };
    
    let picked = upID[chosen];
    if (picked == "1") {
      thingName = `Foxy the Pirate`;
      price = 17500;
      let confirm = await canAfford(thingName, price)
      if (confirm == false) return;
      pizzaData.set(`u${message.author.id}.1`, true)
      let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
      room [1] = "tlLc11fcCc11c11tlL";
      let pizzaria = room.join("\n");
      pizzaData.add(`u${message.author.id}.funfactor`, 10);
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria)
    } else if (picked == "2") {
      thingName = `a table`;
      price = 5000;
      let confirm = await canAfford(thingName, price)
      if (confirm == false) return;
      pizzaData.set(`u${message.author.id}.2`, true);
      pizzaData.add(`u${message.author.id}.funfactor`, 5);
      let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
      var pg = "pgG";
      if (pizzaData.has(`u${message.author.id}.3`)) {
        pg = "sgG";
      }
      room[3] = `${pg}tlLt11t22tlLtlL`;
      let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "3") {
    thingName = `improved security`;
      price = 20000;
      let confirm = await canAfford(thingName, price)
      if (confirm == false) return;
      pizzaData.set(`u${message.author.id}.3`, true);
      pizzaData.add(`u${message.author.id}.funfactor`, 10);
      let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
      var t1 = "tlLtlLtlLtlLtlL";
      if (pizzaData.has(`u${message.author.id}.2`)) {
        t1 = "tlLt11t22tlLtlL";
      }
      room[3] = `sgG${t1}`;
      let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "4") {
    thingName = `Freddy Fazbear`;
      price = 50000;
      let confirm = await canAfford(thingName, price)
      if (confirm == false) return;
      pizzaData.set(`u${message.author.id}.4`, true);
      pizzaData.add(`u${message.author.id}.funfactor`, 50);
      let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
      room[1] = `tlLc11frRc11c11tlL`;
      let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "5") {
    thingName = `some balloons`;
    price = 20000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.5`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 20);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    room[2] = "tlLtlLbaAbaAtlLtlL";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "6") {
    thingName = `a Double Stage`;
    price = 150000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.6`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 150);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    room[0] = "tlLtlLs11ffFtlLtlL";
    room[1] = "tlLtlLs22s22tlLtlL";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "7") {
    thingName = `even more balloons`;
    price = 15000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.7`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 15);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    room[2] = "tlLbaAbaAbaAbaAtlL";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "8") {
    thingName = `another table`;
    price = 25000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.8`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 25);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    room[3] = "sgGt11t22t11t22tlL";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "9") {
    thingName = `Bonnie the Bunny`;
    price = 7500000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.9`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 750);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    var t1 = "tlLtlLbbBffFtlLtlL";
      if (pizzaData.has(`u${message.author.id}.10`)) {
        t1 = "tlLs11bbBffFs11tlL";
      }
    room[0] = t1;
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "10") {
    thingName = `the quadro stage deluxe`;
    price = 10000000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.10`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 1000);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    var t1 = "tlLs11s11ffFs11tlL";
      if (pizzaData.has(`u${message.author.id}.9`)) {
        t1 = "tlLs11bbBffFs11tlL";
      }
    room[0] = t1;
    room[1] = "tlLs22s22s22s22tlL";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "11") {
    thingName = `a refurbished Foxy the Pirate`;
    price = 50000000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.11`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 5000);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    var t1 = "tlLfxXbbBffFs11tlL";
      if (pizzaData.has(`u${message.author.id}.12`)) {
        t1 = "tlLfxXbbBffFccCtlL";
      }
    room[0] = t1;
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "12") {
    thingName = `Chica the Chicken`;
    price = 250000000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.12`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 25000);
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    var t1 = "tlLs11bbBffFccCtlL";
      if (pizzaData.has(`u${message.author.id}.11`)) {
        t1 = "tlLfxXbbBffFccCtlL";
      }
    room[0] = t1;
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  } else if (picked == "13") {
    thingName = `Arcade Machines`;
    price = 500000000;
    let confirm = await canAfford(thingName, price)
    if (confirm == false) return;
    pizzaData.set(`u${message.author.id}.13`, true);
    pizzaData.add(`u${message.author.id}.funfactor`, 50000)
    let room = pizzaData.get(`u${message.author.id}.room`).split("\n");
    room[0] = "arRfxXbbBffFccCarR";
    let pizzaria = room.join("\n");
      pizzaData.set(`u${message.author.id}.room`, pizzaria);
      show.run(message, pizzaria);
  };
      
  })
  
};
module.exports.config = {
  name: "uppizzaria",
  aliases: ["upp","upgradep","upgradepizzaria"]
}