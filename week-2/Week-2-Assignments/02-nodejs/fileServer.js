/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let pathOfFiles = './files'
// Get the file name inside folder
app.get('/files', (req, res) => {
  const listOfFiles = fs.readdir(pathOfFiles, 'utf8', (err, files) => {
    if(err) {
      res.status(404).send("Some Error occured")
      return
    }
    res.status(200).json(files)
  })
})

// Get the content of file
app.get('/files/:fileName', (req, res) => {
  const fileName = req.params.fileName
  fs.readdir(pathOfFiles, 'utf8', (err, files) => {
    if(err) {
      res.status(404).send("Some error occured")
      return
    }
    let fileFound = false
    for(let i=0; i < files.length; i++) {
      if(files[i] === fileName) {
        fileFound = true
        fs.readFile(`${pathOfFiles}/${files[i]}`, 'utf8', (err, data) => {
          if(err) {
            res.send("Some Error occured during reading of file")
            return
          }
          res.status(200).send(data)
          return
        })
      }
    }
    if(!fileFound) {
      res.status(404).send("File Not found")
    }
  })
})
app.listen(2000, () => {
  console.log("Started server")
})
module.exports = app;
