module.exports.run = async (msg) => {
  const db = require("betterqdb");
  let userData = new db.table("user");

  if (!userData.has(`u${msg.author.id}.cr`)) userData.set(`u${msg.author.id}.cr`, 0);
  
  if (!userData.has(`u${msg.channel.guild.id}.${msg.author.id}.xp`)) userData.set(`u${msg.channel.guild.id}.${msg.author.id}.xp`, 0);
  
  if (!userData.has(`u${msg.channel.guild.id}.${msg.author.id}.level`)) userData.set(`u${msg.channel.guild.id}.${msg.author.id}.level`, 0);
  
  
  
  if (!userData.has(`u${msg.author.id}.daily`)) userData.set(`u${msg.author.id}.daily`, 0);
  if (!userData.has(`u${msg.author.id}.bio`)) userData.set(`u${msg.author.id}.bio`, "hewwwwwo! uwu");
  if (!userData.has(`u${msg.author.id}.tc`)) userData.set(`u${msg.author.id}.tc`, 0);
  if (!userData.has(`u${msg.author.id}.at`)) userData.set(`u${msg.author.id}.at`, 0);
  if (!userData.has(`u${msg.author.id}.bank`)) userData.set(`u${msg.author.id}.bank`, 0);
  if (!userData.has(`u${msg.author.id}.banklvl`)) userData.set(`u${msg.author.id}.banklvl`, 0);
  
};