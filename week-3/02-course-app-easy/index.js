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
    user["purchasedCourses"] = []
    USERS.push(user)
    res.status(200).json({message: "User created successfully."})
  }
  
});

// user authentication middleware
const authenticateUser  = (req, res, next) => {
  const user = req.headers
  const userExist = USERS.find(u => u.username === user.username && u.password === user.password)

  if(userExist) {
    req.user = user
    next()
  }else{
    return res.status(403).send("Unauthorized")
  }
}
app.post('/users/login', authenticateUser, (req, res) => {
  res.json({message: `Succesfully logged in ${req.user.username}`})
});

app.get('/users/courses', authenticateUser, (req, res) => {
  res.status(200).json(COURSES)
});

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
  const courseId = req.params.courseId
  const course = COURSES.find(c => c.courseId === courseId)

  if(course) {
    const username = req.headers.username
    const user = USERS.find(u => u.username === username)
    user.purchasedCourses.push(course)
    res.status(200).json({message: "Course purchased successfully"})
  }else{
    res.status(404).json({message: "course doesn't exist"})
  }

});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
  const username = req.headers.username
  const user = USERS.find(u => u.username === username)
  res.status(200).json({numberOfCourses: user.purchasedCourses.length,purchasedCourses: user.purchasedCourses})
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
