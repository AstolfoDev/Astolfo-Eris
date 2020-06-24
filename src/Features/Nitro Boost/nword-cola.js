

/*

OKAY OKAY I CAN EXPLAIN
im not racist, i promise, this is just a thing for a nitro booster

so chill before u read this code thx thx

*/


module.exports.run = async (client, msg, args) => {
  const GoogleImages = require("google-images");
  const gi = new GoogleImages("014561431307717116145:vw0yfnn5vgp", "AIzaSyBvXuRPx8GLF7vOtGat3hsGRsTEIheBuAk");
  msg.channel.createMessage("michelle OwObama look out!!!1!!1");
  let image = await gi.search("barack obama");
  let randomNumber = [Math.floor(Math.random()*image.length)];
  msg.channel.createMessage({
    embed: {
      color: 0xde1073,
      image: { url: image[randomNumber].url }
    }
  });
};