// ROUTE TO GET RESULTS FROM EACH MATCH
// YEAR DEPENDENT?: YES

// GLOBAL IMPORTS
const express = require('express');
const router = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("dotenv/config")

// DATABASE IMPORTS
const mongoose = require("mongoose")
require("dotenv/config")
const Post = require('../models/Post')

function httpGet(url,key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",url,false)
    xmlHttp.setRequestHeader("X-TBA-Auth-Key", key)
    xmlHttp.send(null)
    return xmlHttp.responseText
}

router.post('/', (req,res,next)=>{

    let responseObject = {
      match_results:[]
    }
  
    const search_team_string = `frc${req.body.teamNumberInput}`
  
    // 2021 CHANGE: CHANGE "2020" TO req.body.yearInput
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/matches/2020`
    var key = process.env.REACT_APP_API_KEY;
    apiGetObject = JSON.parse(httpGet(url,key))
  
    for(let i=0;i<apiGetObject.length;i++) {
      responseObject.match_results.push(apiGetObject[i])
    }
  
    console.log("[STATUS] Returning response object to frontend")
  
    res.json(responseObject)
    console.log("[STATUS] API Call Completed")
  
    // SAVE THE SEARCH TO THE DATABASE
    const post = new Post({
      team: req.body.teamNumberInput,
    })
  
    post.save()
    .then(data => {
      console.log("[STATUS] Uploaded search to TeamsSearched database")
    })  
    .catch(err=>{
      console.log(err)
    })
  
})

module.exports = router;