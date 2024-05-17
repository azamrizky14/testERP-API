require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const { getDatabaseInfo } = require("./utils/databaseUtils");
const getUserInternalModel = require("./models/userInternalModels");
const getCompanyModel = require("./models/companyModels");

const dbListPromise = require("./functions/connectToDatabases");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

// Mount userInternalRoute
const userInternalRoutes = require("./routes/userInternalRoutes");
const companyRoutes = require("./routes/companyRoutes");
app.use("/userInternal", userInternalRoutes);
app.use("/company", companyRoutes);

// Example usage of getUserInternalModel to get userInternal model
getUserInternalModel().then(userInternal => {
  // Start the server only after the userInternal model is created
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error creating userInternal model:", error);
});


app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin
  credentials: true             // Allow sending cookies
}));

// Route handler for default route
app.get("/", (req, res) => {
  res.send("This is Project-M API");
});

// Route handler for /api/dbList
app.get("/api/dbList", async (req, res) => {
  try {
    // Fetch list of databases and collections
    const connections = await dbListPromise;
    const databaseInfo = await getDatabaseInfo(connections);
    res.json(databaseInfo);
  } catch (error) {
    console.error("Error fetching database info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
