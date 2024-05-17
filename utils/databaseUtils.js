// databaseUtils.js

async function getDatabaseInfo(connections) {
  // console.log('tes woi', connections)
    const fixData = Object.values(connections)
    const databaseInfo = [];
    for (const connection of fixData) {
      try {
        const collections = await connection.db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        databaseInfo.push({ name: connection.name, collections: collectionNames });
      } catch (error) {
        console.error(`Error fetching collections for ${connection.name} database:`, error);
      }
    }
    return databaseInfo;
  }
  
  module.exports = { getDatabaseInfo };
  