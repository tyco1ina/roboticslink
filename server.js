const express = require('express');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const path = require('path');
const cors = require('cors');

// DATABASE REQUIREMENTS
const mongoose = require("mongoose")
require("dotenv/config")
const Post = require('./models/Post')

// Other stuff to prevent cors and unexpected stuff
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}))
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

// IMPORTING THE ROUTES
const getConnectionRoute = require("./routes/getconnection")
const getBasicTeamInfoRoute = require("./routes/getbasicteaminfo")
const getDistrictInfoRoute = require("./routes/getdistrictinfo")
const getRankInfoRoute = require("./routes/getrankinfo")
const getWinsLossesTiesRoute = require("./routes/getwinslossesties")
const getEventResultsRoute = require('./routes/geteventresults')
const getMatchResultsRoute = require('./routes/getmatchresults')

// ACKNOWLEDGE CONNECTION
app.use('/api/getconnection', getConnectionRoute)

// GET BASIC TEAM INFORMATION
app.use('/api/getbasicteaminfo', getBasicTeamInfoRoute)

// GET DISTRICT INFORMATION
app.use('/api/getdistrictinfo', getDistrictInfoRoute)

// GET RANKING AND SOME DISTRICT INFORMATION
app.use('/api/getrankinfo', getRankInfoRoute)

// GET WINS, LOSSES, AND TIES
app.use('/api/getwinslossesties', getWinsLossesTiesRoute)

// GET EVENT RESULTS
app.use('/api/geteventresults', getEventResultsRoute)

// GET MATCH RESULTS
app.use('/api/getmatchresults', getMatchResultsRoute)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true }, 
  ()=>{ console.log("[STATUS] Connected to TeamsSearched database")}
)

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})