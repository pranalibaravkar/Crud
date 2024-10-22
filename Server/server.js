// server.js
const express = require("express");
const mongoose= require ("mongoose")
const cors = require("cors");
const UserModel = require("./models/User"); 

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/pranali")

app.get ('/',(req,res) => {
  UserModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.get('/getUser/:id',(req,res) => {
  const id =req.params.id;
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})
app.put('/update/:id',(req,res) => {
  const id =req.params.id;
UserModel.findByIdAndUpdate({_id:id},{
  name: req.body.name, 
  email:req.body.email, 
  age:req.body.age})
.then(users => res.json(users))
.catch(err => res.json(err))
})


app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)  // Use findByIdAndDelete
    .then(users => res.json(users))
    .catch(err => res.json(err));
});






 app.post("/create", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
 })



 app.listen(8000, () => {
  console.log("Server running on port 8000");
});

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // Check user existence
// app.post("/", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const check = await User.findOne({ email: email });
//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("notexist");
//     }
//   } catch (e) {
//     res.status(500).json("Error checking user");
//   }
// });

// Signup route
// app.post("/signup", async (req, res) => {
//     const { email, password, mobile, dob } = req.body;
  
//     const data = {
//       email,
//       password,
//       mobile,
//       dob
//     };
  
//     try {
//       const check = await User.findOne({ email: email });
//       if (check) {
//         return res.json("exist"); // User already exists
//       } else {
//         const newUser = await User.create(data); // Create and save user
//         return res.json("User registered successfully"); // Confirm registration
//       }
//     } catch (error) {
//       console.error("Signup error:", error); // Log the error for debugging
//       return res.status(500).json("Error during signup");
//     }
//   });
  

// Start the server
