module.exports = async (parent, { username }, ctx) => (
  ctx.utils.loops.grabLoops({ username })
);
