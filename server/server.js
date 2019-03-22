

const express = require("express"); //load the express library into the file
const server = express();


server.use(express.static(__dirname + "/html"));


var insults = [
    "you son of a motherless goat",
    "you slime eating dog",
    "you scum-sucking pig"
];

    //params:
    //the path to listen for 
    //the callback function to call once that path has been received
server.get("/", function(request, response){
    //an object representing all of the data coming from the client to the server
    //an object representing all of the data going from the server to the client

    response.send("Hello, World.");
})

server.get("/time", (request, response) =>{
    var now = new Date();
    response.send(now.toLocaleDateString());
});


server.get("/insult", (request, response)=>{
    var arrayLength = insults.length;
    response.send(insults[Math.floor(Math.random() * insults.length)]);
})





server.listen(3001, ()=>{
    console.log("server is running on port 3001");
    console.log("carrier has arrived");
});
