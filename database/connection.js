const { MongoClient } = require("mongodb");

const stringConnection = "mongodb+srv://thainaraiesb:4Opjww5EZq6XgDnB@cluster1.9ovrltd.mongodb.net/?retryWrites=true&w=majority";

const dataBaseName = "thainara";

let db;

function connectDB(callback) {
    MongoClient.connect(stringConnection)
    .then(client => {
        console.log("Connected to MongoDB!");
        db = client.db(dataBaseName);
        callback();
    })
    .catch(error => console.log("It got wrong at the MongoDB"));
}

function getDB() {
    return db;
}

module.exports = { getDB, connectDB}