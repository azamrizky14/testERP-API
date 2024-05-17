const mongoose = require("mongoose");

const dbURLs = {
  "test": "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/test?retryWrites=true&w=majority",
  "testERP-core": "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/testERP-core?retryWrites=true&w=majority",
  "testERP-module": "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/testERP-module?retryWrites=true&w=majority",
  "testERP-history": "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/testERP-history?retryWrites=true&w=majority",
  "testERP-report": "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/testERP-report?retryWrites=true&w=majority"
};

async function connectToDatabases() {
  const dbList = {}; // Initialize dbList here

  try {
    for (const dbName in dbURLs) {
      if (dbURLs.hasOwnProperty(dbName)) {
        const connectionURL = dbURLs[dbName];
        const connection = await mongoose.createConnection(connectionURL);
        // console.log(`Connected to ${dbName} database!`);
        dbList[dbName] = connection;
      }
    }

    const dbTotal = Object.keys(dbList).length
    console.log('Total Databases Connected: ', dbTotal)
    return dbList;
  } catch (error) {
    console.error("Failed to connect to databases:", error);
    throw error;
  }
}

// Export dbList directly from connectToDatabases function
module.exports = connectToDatabases();
