// ROUTE TO GET THE DISTRICT RANK AND DISTRICT POINTS FROM THE API
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
    // For getting the district ranking and total ranking points,
    // Iterate through the returned list and if the list's team_key is the team key of the passed team,
    // Append the rank of the same list to the response object
    const search_team_string = `frc${req.body.teamNumberInput}`
    let responseObject = {
      district_key:'',
      district_rank:0,
      ranking_points:0
    }
  
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/districts`;
    var key = process.env.REACT_APP_API_KEY;
    apiGetObject = JSON.parse(httpGet(url,key))

    // if year input is 2020:
    try {
      responseObject.district_key = apiGetObject[apiGetObject.length - 2].key
    } catch (err) {
      responseObject.district_key = "Could not find district rank information"
    }

    // 2021 CHANGE
    // if year input is 2021:
    // try {
    //   responseObject.district_key = apiGetObject[apiGetObject.length - 1].key
    // } catch (err) {
    //   responseObject.district_key = "Could not find district rank information"
    // }

  
    var url = `https://www.thebluealliance.com/api/v3/district/${responseObject.district_key}/rankings`;
    var key = process.env.REACT_APP_API_KEY;
    apiGetObject = JSON.parse(httpGet(url,key))
  
    console.log("[STATUS] Finding district rank info and total ranking points")
    for (let i=0;i<apiGetObject.length;i++) {
      if (apiGetObject[i].team_key === search_team_string) {
        responseObject.district_rank = apiGetObject[i].rank
        responseObject.ranking_points = apiGetObject[i].point_total
      }
    }
  
    res.json(responseObject)
})

module.exports = router;