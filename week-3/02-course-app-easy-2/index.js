const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const {v4: uuid4} = require('uuid')
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Secret key for admin
const secretForAdmin = "123_gili_gili_chhu"

// Generate Jwt token for admin
const generateJwtTokenAdmin = (username) => {
  const token = jwt.sign({username: username}, secretForAdmin, {expiresIn: "1h"})
  return token

}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const {username, password} = req.body
  const adminExist = ADMINS.find(u => u.username === username)
  if(adminExist) {
    return res.status(403).json({message: "Admin already exists!"})
  }else {
    ADMINS.push({
      username: username,
      password: password
    })
    const token = generateJwtTokenAdmin(username)
    res.status(200).json({
      message: "Admin created successfully",
      token: token
    })
  }
  
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body
  const isAdminExist = ADMINS.find(a => a.username === username && a.password === password )
  if(isAdminExist) {
    const token = generateJwtTokenAdmin(username)
    res.status(200).json({message: "Admin logged in successfully", token: token})
  }else{
    res.status(403).json({message: "Unauthorized"})
  }
});

// Authenticate admin middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, secretForAdmin, (err, user) => {
      if(err) {
        return res.status(403).json({message: "Unauthorized"})
      }else {
        req.user = user
        next()
      }
    })
  }
}

app.post('/admin/courses', authenticateAdmin, (req, res) => {
  //  { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } 
  const course = req.body
  const courseId = uuid4()
  if(!course.title) {
    return res.status(401).json({message: "Can't add courses without title"})
  }
  const courseExist = COURSES.find(c => c.title === course.title)
  if(courseExist) {
    return res.send("Course with same title exists")
  }else {
    course["courseId"] = courseId
    COURSES.push(course)
    res.status(200).json({message: "Course Added successfully"})
  }
});

// updating course
app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  const updatedCourse = req.body
  const courseId = req.params.courseId
  const course = COURSES.find(c => c.courseId === courseId)
  if(course) {
    Object.assign(course, updatedCourse)
    return res.status(200).json({message: "Course Updated successfull"})
  }else {
    res.status(404).send("Doesn't find any course with course id")
  }
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
  res.status(200).json({COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
