// userInternalRoutes.js
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Define routes and map them to controller methods

// GET ROUTER
router.get("/", companyController.getAllDomain);

// POST ROUTER
router.post("/listByDomainCode", companyController.listByDomainCode);

// PUT ROUTER

// Add more routes as needed

module.exports = router;
