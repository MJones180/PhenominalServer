module.exports = (min, max) => {
  // Round to make whole numbers
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  // Generate a number between [min, max]
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
