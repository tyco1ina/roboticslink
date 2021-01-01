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
    const search_team_string = `frc${req.body.teamNumberInput}`
    let responseObject = {
      district:''
    }
  
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/districts`;
    var key = process.env.REACT_APP_API_KEY;
    apiGetObject = JSON.parse(httpGet(url,key))
  
    // Putting the district info into the response object
    // But it doesn't always work, so here is a really confusing try catch section
    console.log("[STATUS] Finding district info")
  
    try {
      responseObject.district = apiGetObject[apiGetObject.length - 2].display_name
    } catch (err) {
      if (err === "TypeError: Cannot read property 'display_name' of undefined") {
        try {
          responseObject.district = apiGetObject[apiGetObject.length - 3].display_name
        } catch (err) {
          if (err === "TypeError: Cannot read property 'display_name' of undefined") {
            responseObject.district = "Could not find district information"
          } else {
            responseObject.district = "Could not find district information"
          }
        }
      } else {
        responseObject.district = "Could not find district information"
      }
    }
  
    res.json(responseObject)
})

module.exports = router;