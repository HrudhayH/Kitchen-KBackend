/*
 Basic script to test connection to MongoDB using MONGO_URI.
 Usage:
   MONGO_URI="mongodb+srv://..." node test-mongo.js
 It will print connection success or detailed error.
*/
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || '';

if (!uri) {
  console.error('ERROR: MONGO_URI not provided (set MONGO_URI environment variable or provide .env).');
  process.exit(2);
}

async function test() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('✅ MongoDB: Connected OK');
    const db = client.db(); // default DB from connection string
    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c=>c.name).slice(0,10));
    await client.close();
    process.exit(0);
  } catch (e) {
    console.error('❌ CONNECT ERROR:', e && e.stack ? e.stack : e);
    process.exit(1);
  }
}

test();
