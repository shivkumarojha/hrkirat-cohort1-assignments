/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser')
const {v4: uuid4} = require('uuid')

app.use(bodyParser.json())
const users = []
// User Signup
app.post('/signup', (req, res) => {
  const userId = uuid4()
  const userName = req.body.userName
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password

  let userExist = false
  for(let i=0; i<users.length; i++) {
    if(users[i].userName === userName) {
      userExist = true
      res.status(400).send("User already exists!")
      return
    }
  }

  if(!userExist) {
    const user = {
      userId: userId,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
    users.push(user)
    res.status(201).send("Signup successful");
  }
})

//  Login users
app.post('/login', (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  
  let userExist = false
  // Check if user exist in the users array
  for(let i=0; i < users.length; i++) {
    if(users[i].userName === userName && users[i].password === password) {
      userExist = true
      res.status(200).json({userId: users[i].userId})
      return
    }
  }

  if(!userExist) {
    res.status(401).send("Unauthorized, credentials are invalid")
  }
})

// Get Users Data
app.get('/data', (req, res) => {
  const userName = req.headers.username
  const password = req.headers.password
  
  let userExist = false
  for(let i = 0; i < users.length; i++) {
    if(users[i].userName === userName && users[i].password === password) {
      userExist = true
      
    }
  }
  if(userExist) {
    let allUsers = []
    for(let i = 0; i < users.length; i++) {
      const userData = {
        userName: users[i].userName,
        firstName: users[i].firstName,
        lastName: users[i].lastName,
      };
      allUsers.push(userData)

    }
    res.status(200).json(allUsers)
    return
  }else {
    res.status(401).send("Unauthorized")
  }
})

app.listen(PORT, () => console.log("Server is running..."))
module.exports = app;
