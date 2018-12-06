module.exports = wrappedFunc => (
  // Create a promise
  new Promise((done, reject) => {
    // Call the wrapped function with the done cb
    wrappedFunc(done, reject);
  }).then(data => data)
);
