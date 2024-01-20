const fs = require('fs')

pathToFile = './example.txt'

textToWrite = "Hello world from the write file"

fs.appendFile(pathToFile, textToWrite, 'utf8', (err) => {
    if(err){
        console.log("Error occured: ", err)
        return
    }
    console.log("File written successfully")
})