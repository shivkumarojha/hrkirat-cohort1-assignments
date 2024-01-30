const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const {v4: uuid4} = require('uuid')
const mongoose = require('mongoose')
app.use(express.json());


// Secret key for admin
const secretForAdmin = "123_gili_gili_chhu";

// Generate Jwt token for admin
const generateJwtTokenAdmin = (username) => {
  const token = jwt.sign({ username: username }, secretForAdmin, {
    expiresIn: "1h",
  });
  return token;
};

// Generate web token for user
const secretForUser = "Saka_laka_boom_boom";
const generateJwtTokenUser = (username) => {
  const token = jwt.sign({ username: username }, secretForUser, {
    expiresIn: "1h",
  });
  return token;
};
// Define Mongoose schema
const userSchema = new mongoose.Schema({
  username: {type: String},
  password: String,
  purchasedCourses: [{ type: 'ObjectId', ref:'Course'}]
})

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// Define Mongoose model
const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

// Connect to mongodb cluster
// mongoose.connect('mongodb+srv://shivkumarojha:shiva%40321%23@cluster0.0xxo9rh.mongodb.net/courses')
mongoose.connect('mongodb://localhost:27017/courses')
// Admin routes
app.post('/admin/signup', async(req, res) => {
  const { username, password } = req.body;
  const adminExist = await Admin.findOne({ username })
  if (adminExist) {
    return res.status(403).json({ message: "Admin already exists!" });
  } else {
    const newAdmin =  new Admin({
      username, password
    })
    newAdmin.save()
    const token = generateJwtTokenAdmin(username);
    res.status(200).json({
      message: "Admin created successfully",
      token: token,
    });
  }
});


app.post('/admin/login', async(req, res) => {
   const { username, password } = req.body;
   const isAdminExist = await Admin.findOne({username, password})
   if (isAdminExist) {
     const token = generateJwtTokenAdmin(username);
     res
       .status(200)
       .json({ message: "Admin logged in successfully", token: token });
   } else {
     res.status(403).json({ message: "Unauthorized" });
   }
});

// Authenticate admin middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretForAdmin, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

app.post('/admin/courses', authenticateAdmin, async(req, res) => {
  const course = req.body;
  const courseId = uuid4();
  if (!course.title) {
    return res.status(401).json({ message: "Can't add courses without title" });
  }
  title = course.title
  const courseExist = await Course.findOne({title})
  if (courseExist) {
    return res.send("Course with same title exists");
  } else {
    const newCourse = new Course({...course})
    newCourse.save()
    res.status(200).json({ message: "Course Added successfully" });
  }
});

app.put('/admin/courses/:courseId', authenticateAdmin, async(req, res) => {
  const updatedCourse = req.body;
  const courseId = req.params.courseId;
  const course =  await Course.findOne({ _id: courseId })
  if (course) {
    const updateCourse = await Course.findByIdAndUpdate(courseId, updatedCourse, {new: true})
    return res.status(200).json({ message: "Course Updated successfull" });
  } else {
    res.status(404).send("Doesn't find any course with course id");
  }
});

app.get('/admin/courses',authenticateAdmin , async(req, res) => {
  const courses = await Course.find()
  if(courses) {
    res.status(200).json(courses)
  }else {
    res.status(404).json({message: "No courses Found"})
  }
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
