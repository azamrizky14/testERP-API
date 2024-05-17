// userInternalController.js
require('dotenv').config();
const createUserInternalModel = require("../models/userInternalModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let UserInternal 
async function getUserInternal() {
    UserInternal = await createUserInternalModel();
}  
getUserInternal()

// Controller method to get all users
async function getAllUsers(req, res) {
  try {
    // Retrieve all users from the database
    const users = await UserInternal.find({ isDeleted: "no" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to get user data by ID
async function getUserById(req, res) {
    try {
      const { userId } = req.params;
  
      // Find the user by ID
      const user = await UserInternal.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      else if (user.isDeleted === "yes") {
        return res.status(404).json({ message: "User has deleted" });
      }
      else if (user.userAccStatus === "disabled") {
        return res.status(404).json({ message: "User has blocked" });
      }
  
      res.json(user); // Send the user data in the response
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

// Controller method to create a new user
async function createUser(req, res) {
  try {
    const email = req.body.email
    const user = await UserInternal.findOne({ email });

    // Check if user exists
    if (user) {
      return res.status(401).json({ message: "Email Sudah Ada!" });
    }
    // Create a new user based on the request body
    const newUser = await UserInternal.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to update data user
async function updateUser(req, res) {
    try {
      const { userId } = req.params; // Assuming userId is passed in the request URL
      const newData = req.body; // New data to update
  
      const dataUser = await UserInternal.findById(userId);
      if (dataUser.isDeleted === "yes") {
        return res.status(404).json({ message: "User has deleted" });
      }
      else if (dataUser.userAccStatus === "disabled") {
        return res.status(404).json({ message: "User has blocked" });
      }
      // Find the user by ID and update their data
      const updatedUser = await UserInternal.findByIdAndUpdate(userId, newData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
    // Increment the __v field by 1
    updatedUser.__v += 1;
    await updatedUser.save();
  
      res.json(updatedUser); // Send the updated user data in the response
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  

// Controller method for user login
async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await UserInternal.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: "Email Tidak Ada!" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // Check if the password is valid
      if (!isPasswordValid) {
        return res.status(401).json({ message: "password Salah!" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Send the token and user data in the response
      res.json({ token, user: user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }



// Export the controller methods
module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  getUserById
  // Add more controller methods as needed
};
