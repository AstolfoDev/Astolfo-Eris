module.exports.run = async (client, message, args) => {
  if (message.author.id != "193044575500238849") return message.channel.createMessage("nuuu ty lawl :3");
  let time1 = new Date().getMilliseconds();
  var number = 0;
  for (let i=0;i<=10000;i++) {
    number = number+(number+1);
  }
  let time2 = new Date().getMilliseconds();
  message.channel.createMessage(`Took ${time2-time1} ms`);
  
};
module.exports.config = {
  name: "test",
  aliases: ["test"],
  description: "test"
};