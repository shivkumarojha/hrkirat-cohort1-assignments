const fs = require("fs")


const pathOfFile = './example.txt'

fs.readFile(pathOfFile, "utf8", (err, data) => {
    if(err) {
        console.log("Error reading file", err)
        return
    }
    console.log('File content', data)
})

// Expensive operation
let sum;
for(let i = 0; i <= 1000000000; i++) {
    sum += i
    
}

