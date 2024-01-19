/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

let transactions = [
  {
    itemName: "Coke",
    category: "Drink",
    price: 40,
    timestamp: 43432,
  },
  {
    itemName: "Honey",
    category: "Eat",
    price: 340,
    timestamp: 443432,
  },
  {
    itemName: "Vegetables",
    category: "Eat",
    price: 20,
    timestamp: 22,
  },
  {
    itemName: "Milk",
    category: "Drink",
    price: 70,
    timestamp: 434,
  },
  {
    itemName: "Detol",
    category: "LifeStyle",
    price: 40,
    timestamp: 853452,
  },
  {
    itemName: "rwol",
    category: "LifeStyle",
    price: 20,
    timestamp: 853452,
  },
];

function calculateTotalSpentByCategory(transactions) {
  let spendEstimates = {}
  for(let i=0; i<transactions.length; i++) {
    let t = transactions[i]
    if(spendEstimates[t.category]) {
      spendEstimates[t.category] = spendEstimates[t.category] + t.price
    }else {
      spendEstimates[t.category] = t.price
    }
  }

  let key = Object.keys(spendEstimates)
  let structuredSpentEstimate = []
  for(let i=0; i<key.length; i++) {
    let obj = {
      category: key[i],
      totalSpent: spendEstimates[key[i]]
    }
    structuredSpentEstimate.push(obj)
  }

  return structuredSpentEstimate

}

let result = calculateTotalSpentByCategory(transactions)
console.log(result)
module.exports = calculateTotalSpentByCategory;
