/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function delaySeconds(second) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved After ${second} seconds`);
    }, second * 1000);
  });
}

function waitOneSecond() {
  return delaySeconds(1);
}

function waitTwoSecond() {
  return delaySeconds(2);
}

function waitThreeSecond() {
  return delaySeconds(3);
}

function callOtherFunctions() {}

function calculateTime() {
  let startTime = new Date();
  waitOneSecond()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  waitTwoSecond()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  waitThreeSecond()
    .then((result) => {
      console.log(result);
      let endTime =  new Date()
      console.log("Time it take to resolve all Promises sequencially: ", (endTime - startTime))
    })
    .catch((error) => console.log(error));

}



calculateTime()