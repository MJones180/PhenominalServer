module.exports = async (parent, { username }, ctx) => (
  ctx.utils.dots.grabDots({ username })
);
