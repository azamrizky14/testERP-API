// userInternalRoutes.js
const express = require("express");
const router = express.Router();
const userInternalController = require("../controllers/userInternalController");

// Define routes and map them to controller methods

// GET ROUTER
router.get("/detail/:userId", userInternalController.getUserById);
router.get("/", userInternalController.getAllUsers);

// POST ROUTER
router.post("/create", userInternalController.createUser);
router.post("/login", userInternalController.loginUser);

// PUT ROUTER
router.put("/update/:userId", userInternalController.updateUser);
// Add more routes as needed

module.exports = router;
