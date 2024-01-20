/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calc: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor () {
    this.result = 0
  }
  add(number) {
    this.result += number
    console.log(this.result)
    return this.result
  }
  subtract(number) {
    this.result -= number
    console.log("substracted ", this.result)
  }
  
  multiply(number) {
    this.result *= number
    console.log("Multiplied", this.result)
  }
  
  divide(number) {
    if (number === 0) {
      throw new Error("Division by  zero is not allowed")
    }else {
      this.result /= number
      console.log("Divided result ", this.result)
    }
  }
// Sanitizing the expression for removing spaces and other string
sanitizeExpression(expressionString) {
  let sanitizedString = ""
  for(let i=0; i< expressionString.length; i++) {
    if(expressionString[i] === " ") {

    } else {
      sanitizedString += expressionString[i]
    }
  }
  console.log(sanitizedString)
  return sanitizedString
}

  // calulating expression
  calculate(expression) {
    let expressionString = expression;
    let sanitizedExpressionString = this.sanitizeExpression(expressionString);
    // Validate input for invalid characters
    if (!/^[0-9+\-*/().\s]+$/.test(sanitizedExpressionString)) {
      throw new Error("Invalid characters in the expression");
    }
    for(let i=0; i< sanitizedExpressionString.length; i++) {
      if (
        sanitizedExpressionString[i] === "/" &&
        sanitizedExpressionString[i + 1] === 0
      ) {
        console.log("yes found");
        throw new Error("Divide by Zero Error");
      } 
    }
      this.result = eval(sanitizedExpressionString);
      console.log("calculate function result ", this.result);
    
    
  }


  getResult() {
    return this.result
  }
  clear() {
    this.result = 0
  }
}


let calc = new Calculator()
calc.add(10)
calc.add(218);
calc.add(3);

calc.subtract(5)
calc.multiply(2)
calc.divide(10)
// calc.divide(0)
calc.calculate("10/0 +   2 *    (   6 - (4 + 1) / 2) + 7");
module.exports = Calculator;
