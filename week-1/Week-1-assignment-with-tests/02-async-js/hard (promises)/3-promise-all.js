/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function waitOneSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved in one Second");
    }, 1000);
  });
}

function waitTwoSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved in 2 seconds");
    }, 2000);
  });
}

function waitThreeSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved after 3 seconds");
    }, 3000);
  });
}

function calculateTime() {
  let startTime = new Date();
  console.log(startTime);
  Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()]).then(
    (results) => {
      let endTime = new Date();
      console.log(endTime);
      let timeDifference = endTime - startTime;
      console.log("Time Difference = ", timeDifference);
      console.log("Time difference in seconds = ", timeDifference / 1000);
      console.log(results);
    }
  );
}

calculateTime();
