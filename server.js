// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Reservations List
// =============================================================
var everyTableRequest = [];



// Routes
// =============================================================

// Home Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

  // The "make a reservation" page
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  // The page with the tables and the waitlist
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname,"table.html"));
  });


  //Add the first 5 reservations to your tables-api
  app.get("/api/tables",function(req,res){
    res.json(everyTableRequest.slice(0,5));

  });

  // add all other reservation to your waitlist-api
  app.get("/api/waitlist", function(req, res){
    res.json(everyTableRequest.slice(6));
  })


// Sets an endpoint for receiving new posts 
// =============================================================
app.post("/api/reserve", function(req, res) {

  var reservation = req.body;

    everyTableRequest.push(reservation);

    res.json(reservation);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});