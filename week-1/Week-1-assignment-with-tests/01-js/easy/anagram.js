/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  let isAnagramString = ""
  for(let i=0; i < str1.length; i++) {
    for(let j=0; j < str2.length; j++) {
      if(str2[j] === str1[i]) {
        isAnagramString += str2[j]
      }
    }
  }
  console.log(isAnagramString)
  if (str1.length == str2.length && str1 === isAnagramString ) {
    return true
  } else {
    return false
  }
}

let answer = isAnagram("Debit Card", "Bad Credit")
console.log(answer)
module.exports = isAnagram;
