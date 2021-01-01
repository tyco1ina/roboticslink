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
      events:[],
      num_wins:0,
      num_losses:0,
      num_ties:0
    }
  
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/events/2020/statuses`;
    var key = process.env.REACT_APP_API_KEY;
    apiGetObject = JSON.parse(httpGet(url,key))
  
    console.log("[STATUS] Putting each event into the response object")
    for (const property in apiGetObject) {
      responseObject.events.push(apiGetObject[property])
    }
  
    // This loop is used to get the win-lose-tie by finding the events objects, going into the qual and playoff objects, extracting the w-l-t object and
    // appending each win, loss, and tie to responseObject
    console.log("[STATUS] Finding number of wins, losses, and ties")
    for (let i=0;i<responseObject.events.length;i++) {
      // The if statements are used to catch the program not being able to find stuff
  
      // For some reason, the events list has a null event, so this if statement directly below is used to combat that
      if (responseObject.events[i] === null) {
  
      } else {
        if (responseObject.events[i].qual === undefined || responseObject.events[i].qual === null) {
        } else {
          responseObject.num_wins = responseObject.num_wins + responseObject.events[i].qual.ranking.record.wins
          responseObject.num_losses = responseObject.num_losses + responseObject.events[i].qual.ranking.record.losses
          responseObject.num_ties = responseObject.num_ties + responseObject.events[i].qual.ranking.record.ties
        }
    
        if (responseObject.events[i].playoff === undefined || responseObject.events[i].playoff === null) {
    
        } else {
          responseObject.num_wins = responseObject.num_wins + responseObject.events[i].playoff.record.wins
          responseObject.num_losses = responseObject.num_losses + responseObject.events[i].playoff.record.losses
          responseObject.num_ties = responseObject.num_ties + responseObject.events[i].playoff.record.ties
        }
      }
    }
  
    res.json(responseObject)
})

module.exports = router;