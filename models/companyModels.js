const mongoose = require("mongoose");
const dbListPromise = require("../functions/connectToDatabases");
const { ObjectId } = require("mongodb");

// Define your schema
const companySchema = new mongoose.Schema({
  // Define your schema fields
  // For example:
  domainCode: {
    type: Array,
    required: [true, "Please enter domain Code"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter your email"],
  },
  companyDesc: {
    type: String,
  },
  companyPage: {
    type: Array,
  },
  createdBy: {
    type: ObjectId,
    require: [true, "Please enter the creator"]
  },
  isDeleted: {
    type: Boolean,
    enum: [true, false],
    default: false // true dan false
  }
}, {
  timestamps: true,
});

// Access the desired connection from dbList and create the model
async function createAndExportCompanyModel() {
  try {
    // Wait for dbList to resolve
    const dbList = await dbListPromise;
    
    // Access the desired connection from dbList
    const testERP_core_connection = dbList["testERP-core"];

    // If the connection is available, create and export the model
    if (testERP_core_connection) {
      const Company = testERP_core_connection.model("company", companySchema, "company");
      return Company;
    } else {
      throw new Error("testERP-core database connection not found");
    }
  } catch (error) {
    console.error("Error creating Company model:", error);
    throw error;
  }
}

// Export the function to create and get the Company model
module.exports = createAndExportCompanyModel;
