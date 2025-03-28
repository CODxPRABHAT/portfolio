require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    // Try to list databases to verify permissions
    const adminDb = client.db('admin');
    const databases = await adminDb.admin().listDatabases();
    console.log('Available databases:', databases.databases.map(db => db.name));
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
    process.exit(0);
  }
}

run(); 