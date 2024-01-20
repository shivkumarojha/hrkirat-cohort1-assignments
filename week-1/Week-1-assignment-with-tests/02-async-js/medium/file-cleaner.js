const fs = require('fs')
const { pathToFileURL } = require('url')

pathOfFile = './example.txt'
fs.readFile(pathOfFile, 'utf8', (err, data) => {
    if(err){
        console.log("Error Occured: ", err)
        return
    }
    let trimmedString = data.replace(/\s+/g, " ").trim();
    fs.writeFile(pathOfFile, trimmedString, 'utf8', (err) => {
        if(err) {
            console.log("Error Occured: ", err)
            return
        }
        console.log("WhiteSpaces removed Successfully")
    })
})

