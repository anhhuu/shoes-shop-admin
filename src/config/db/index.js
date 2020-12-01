const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://anhhuu:ajhdcYDK8OwmsKpg@shoes-db-dev.u3qsy.mongodb.net';

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb() {
    console.log('Database are connecting!');
    try {
        await client.connect();
        database = client.db('shoes_shop_dev_v1');
        // Establish and verify connection
        console.log('Database connected!');
    } catch (err) {
        console.log("Database isn't connected! <ERR: " + err + ">")
    }
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;