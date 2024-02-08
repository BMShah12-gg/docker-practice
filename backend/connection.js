// mysql
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: '10.0.1.33',
//     user: "root",
//     password: "root12345",
//     port: 3307,
//     database: 'automotive'
// })

// module.exports = connection;

// mongo
module.exports.db_connect = async () => {
    let mongo_client = require('mongodb').MongoClient;
    // let url = 'mongodb://localhost:3004/';
    let url = "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PWD + "@mongo-service:27017/";
    const client = new mongo_client(url);
    let database = client.db('mydb');
    return database;
    // await MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     return db;
    // });
}
