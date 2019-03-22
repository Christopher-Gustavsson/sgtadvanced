

const express = require("express"); //load the express library into the file
const mysql = require("mysql");
const mysqlcredentials = require("./mysqlcreds.js");

const db = mysql.createConnection(mysqlcredentials);
const server = express();


// server.use(express.static(__dirname + "/html"));
server.use(express.static(__dirname + "/html"));
// when server gets requests, looks for a path inside the html folder. Looks for index.html by default if no other path specified and serves it.


server.get("/api/grades", (req, res)=>{
    res.send(`{
        "success": true,
        "data": [{
            "id": 1,
            "name": "Postman",
            "course": "Mail Fraud",
            "grade": 100
        }, {
            "id": 76,
            "name": "Bob",
            "course": "Cowboying",
            "grade": 25
        }, {
            "id": 2,
            "name": "Bobby",
            "course": "Mail Fraud",
            "grade": 70
        }, {
            "id": 4,
            "name": "Robert",
            "course": "Linear Algebra",
            "grade": 1
        }]
    }`);
})


server.listen(3001, ()=>{
    console.log("server is running on port 3001");
    console.log("carrier has arrived");
});

