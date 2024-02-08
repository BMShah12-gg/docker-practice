const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();
const db = require("./connection");
// const MongoClient = require('mongodb').MongoClient;
// for pod-standalone
// const url = "mongodb://root:root@localhost:27017/";
// for docker-compose
// const url = "mongodb://root:root@database:27017/";
// const url = "mongodb://root:root@mongo:27017/";
// const url = "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PWD + "@mongo-service:27017/";
app.use(express.json());
app.use(cors({ origin: true }));
app.use('/backend', router);


router.get('/', async (req, res) => {
    console.log('here')
    //mysql
    // connection.query('SELECT firstname, lastname FROM users', (err, data)=>{
    //     if(data && data.length > 0)
    //         res.send({status:200, data: data})
    //     else
    //         res.send({status:404, data: 'No data found.'})
    // })

    // mongo
    try {
        // let database = await MongoClient.connect(url);
        // let db = database.db('mydb');
        let table = (await db.db_connect()).collection('users');
        let data = await table.find({}).toArray();
        if(data.length > 0)
            res.send({ status: 200, data: data})
        else
            res.send({ status: 404, data: 'No data found.' })
        // let result = await db_connect.collection('users').find({}).toArray();
        // if (result && result.length > 0)
        //     res.send({ status: 200, data: result })
        // else
        //     res.send({ status: 404, data: 'No data found.' })


        // await MongoClient.connect(url, (err, db) => {
        //     console.log('here 30');
        //     if (err) throw err;
        //     let dbo = db.db("mydb");
        //     dbo.collection("users").find({}, (error, result) => {
        //         if (error) throw error;
        //         console.log(result);
        //         res.send(result);
        //     });

        // })
    }
    catch (e) {
        console.log('e', e)
    }
})

router.post('/add', async (req, res) => {
    let table = (await db.db_connect()).collection('users');
    let data = await table.insertOne({ name: req.body.data});
    res.send({ status: 200, data: 'Data inserted successfully.' })
})

router.delete('/delete', (req, res) => {
    res.send('Delete user.')
})

router.get('*', (req, res) => {
    res.send('Invalid URL.')
})

// app.use(function (req, res, next) {
//     let headers = {};

//     //set header to handle the CORS    
//     headers['Access-Control-Allow-Origin'] = '*';
//     headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, ApiTestKey';
//     headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
//     headers['Access-Control-Max-Age'] = '86400';
//     headers['Access-Control-Allow-Credentials'] = true;
//     res.writeHead(200, headers);

//     if (req.method === 'OPTIONS') {
//         console.log('OPTIONS SUCCESS');
//     }
//     else {
//         //other requests
//     }
//     next();
// })

app.listen(3001, () => {
    console.log('Server is listening on port 3001')
})
