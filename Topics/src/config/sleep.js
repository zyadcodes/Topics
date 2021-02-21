// This is going to export a function that simply will wait for the given amount of milliseconds
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Exports the function
export {sleep};
