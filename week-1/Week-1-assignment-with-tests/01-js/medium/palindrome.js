/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function transformStr(str) {
  let lowerCaseStr = str.toLowerCase()
  let trimmedString = ""
  for(let i=0; i<lowerCaseStr.length; i++) {
    if (
      lowerCaseStr[i] === " " ||
      lowerCaseStr[i] === "," ||
      lowerCaseStr[i] === "!" ||
      lowerCaseStr[i] === "?" ||
      lowerCaseStr[i] === "'" ||
      lowerCaseStr[i] === "."
    ) {
    } else {
      trimmedString += lowerCaseStr[i];
    }
  }
  console.log(trimmedString)
  return trimmedString
}
function isPalindrome(str) {
  let transformedString = transformStr(str)
  let reversedString = ""
  for(let i=transformedString.length-1; i>=0; i-- ) {
    reversedString += transformedString[i]
  }
  return reversedString === transformedString
}

let result = isPalindrome("'Eva, can I see bees in a cave?'");
console.log(result)

module.exports = isPalindrome;
