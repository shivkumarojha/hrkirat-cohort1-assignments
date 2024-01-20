/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  return new Promise((resolve) => {
      console.log("In Promise")
    setTimeout(() => {
      resolve("This Line runs after n second passed");
    }, n);
  });
}

wait(10000).then((result) => {
  console.log("Promise has been resolved", result);
})
.catch((error) => {
    console.log("Error")
})
