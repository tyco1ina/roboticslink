// ROUTE TO GET BASIC INFORMATION ABOUT THE TEAM
// YEAR DEPENDENT?: YES

// GLOBAL IMPORTS
const express = require('express');
const router = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("dotenv/config")

function httpGet(url,key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",url,false)
    xmlHttp.setRequestHeader("X-TBA-Auth-Key", key)
    xmlHttp.send(null)
    return xmlHttp.responseText
}

router.post('/', (req,res,next)=>{

    console.log(`[STATUS] Creating a response object for ${req.body.teamNumberInput}`)
  
    let responseObject = {
      team_name:'',
      team_number:'',
      location:'',
      school_name:'',
      rookie_year:'',
      }
  
  
    // Status prints
    const search_team_string = `frc${req.body.teamNumberInput}`
  
    // // GET request setup and get request
    var key = process.env.REACT_APP_API_KEY;
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}`;
    let apiGetObject = JSON.parse(httpGet(url,key))

    console.log(apiGetObject)

    // Putting the basic info into the response object
    console.log("[STATUS] Finding, number, location, school name, and rookie year")
    responseObject.team_name = apiGetObject.nickname
    responseObject.team_number = apiGetObject.team_number
    responseObject.location = `${apiGetObject.city}, ${apiGetObject.state_prov}, ${apiGetObject.country}`
    responseObject.school_name = apiGetObject.school_name
    responseObject.rookie_year = apiGetObject.rookie_year
  
    res.json(responseObject)
})

module.exports = router;