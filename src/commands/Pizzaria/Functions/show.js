module.exports.run = async (message, pizzaria) => {
  let tl = "<:tile5:712470354974736484>";
  let t1 = "<:table1:712444458880467054>";
  let t2 = "<:table2:712444495735554119>";
  let t3 = "<:table3:712444955658027021>";
  let ba = "<:balloons:712470653864902658>";
  let ar = "<:arcade:712470634038427700>";
  let pg = "<:slaughter:712443765595308053>";
  let sg = "<:guard:712483920200990741>";
  let c1 = "<:curtains1:712442160703602760>";
  let c2 = "<:curtains2:712442178022014998>";
  let es = "<:empty:712443175725170749>";
  let s1 = "<:stage1:712450300493168671>";
  let s2 = "<:stage2:712464791633133619>";
  let mg = "<:mangle:712446520309579797>";
  let fc = "<:foxycove:712443212664668171>";
  let ff = "<:freddy:712450356868677644>";
  let bb = "<:bonnie:712452695751131247>";
  let cc = "<:chica:712454561280950342>";
  let fx = "<:foxy:712462864828465153>";
  let ch = "<:child1:712446580233338910>";
  let fr = "<:freddycove:712668930635989063>";
  var msg = pizzaria.replace(/tlL/g, tl).replace(/t11/g, t1).replace(/t22/g, t2).replace(/t33/g, t3).replace(/arR/g, ar).replace(/baA/g, ba).replace(/pgG/g, pg).replace(/sgG/g, sg).replace(/c11/g, c1).replace(/c22/g, c2).replace(/esS/g, es).replace(/s11/g, s1).replace(/s22/g, s2).replace(/mgG/g, mg).replace(/fcC/g, fc).replace(/ffF/g, ff).replace(/bbB/g, bb).replace(/ccC/g, cc).replace(/fxX/g, fx).replace(/chH/g, ch).replace(/frR/g, fr);
  message.channel.createMessage(msg);
}