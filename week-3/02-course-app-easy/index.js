const express = require('express');
const app = express();
const {v4: uuid4} = require('uuid')
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const {username, password} = req.headers

  const adminExist = ADMINS.find(admin => admin.username === username && admin.password === password)

  if(adminExist) {
      next()
    }else {
      res.status(401).json({message: "Admin doesn't exists!"})
    }
  }
  

// Admin routes
app.post('/admin/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let adminExist = false
  for (let i = 0; i < ADMINS.length; i++) {
    if(ADMINS[i].username === username) {
      adminExist = true
    }
  }
  if(adminExist){
    res.status(401).send("Admin exists!")
  }else {
    ADMINS.push({
      username: username,
      password: password
    })
    res.status(200).json({message: "Admin created successfully"})
  }
});

app.post('/admin/login', authenticateAdmin,(req, res) => {
  res.status(200).json({message: "Admin logged in successfully"})
});

// Create new course
app.post('/admin/courses', authenticateAdmin, (req, res) => {
  // { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
  
  const course = req.body
  const courseId = uuid4()
  course["courseId"] = courseId
  // Check if the course title is not empty
  if(!course.title) {
    return res.status(303).json({message: "Can't add a course with empty title"})
  }

  // Check if course exist with same title 
  const courseExist = COURSES.find(c => c.title === course.title )
  
  if(courseExist) {
    return res.status(403).send("Course already exists!")
  }else{
    COURSES.push(course)
    res.status(201).json({message: "Course added successfully", courses: COURSES})
  }
  });

// Edit a course
app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  const updatedCourse = req.body
  const courseId = req.params.courseId
  const course = COURSES.find(c => c.courseId === courseId)
  if(course) {
    Object.assign(course, updatedCourse)
    res.status(200).json({message: "Course updated successfully"})
    return
  }else{
    res.status(404).send("Course does not exist") 
  }
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
  res.status(200).json(COURSES)
});

// User routes
app.post('/users/signup', (req, res) => {
  const user = req.body
  const userExist = USERS.find(u => u.username === user.username)
  if(userExist) {
    return res.status(403).json({message: "User already exists!"})
  }else {
    USERS.push(user)
    res.status(200).json({message: "User created successfully."})
  }
  
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
