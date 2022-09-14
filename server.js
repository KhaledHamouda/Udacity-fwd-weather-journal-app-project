// express to runserver and routes
const express = require("express");

//Start up an instance of app
const app = express();

// Enable All CORS Requests
const cors = require("cors");
app.use(cors());

// Dependencies
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// empty js to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

    /*Set up server on port 4000 */
const port = 4000;
const hostname = "127.0.0.1";

// TODO-Spin up the server
const server=app.listen(port, listening);
function listening(){ 
    console.log(`server running on localhost name:${hostname} and on port:${port}/`);
}

// Callback function to complete GET '/all'
app.get("/all", getAll);
function getAll(req, res) {
    res.status(200).send(projectData);
}

// Call back function to returning the projectData object which containing the info of the zip code
app.post("/add", postData);
function postData(req, res){
    projectData = req.body;
    res.status(200).send(projectData);
  }

