// ROUTE TO GET RESULTS FROM EACH EVENT
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
    // This is to get info about all of the events, put it into an object, and put it into the events_results list:
    // Needs to get: event name, date, location, w-l-t record for that event, and final standing in quals
  
    let responseObject = {
      events:[],
      event_results:[]
    }
  
    const search_team_string = `frc${req.body.teamNumberInput}`
    var key = process.env.REACT_APP_API_KEY;
    // 2021 CHANGE: CHANGE "2020" TO req.body.yearInput
    var url = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/events/2020/simple`;
    apiGetObject = JSON.parse(httpGet(url,key))
  
    // 2021 CHANGE: CHANGE "2020" TO req.body.yearInput
    var url2 = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/events/2020/statuses`;
    const apiGetObject2 = JSON.parse(httpGet(url2,key))
  
    console.log("[STATUS] Putting each event into the response object")
    for (const property in apiGetObject2) {
      responseObject.events.push(apiGetObject2[property])
    }
    
    console.log("[STATUS] Finding results for each event")
  
    for (let i=0;i<apiGetObject.length;i++) {
      let objectToAppend = {
        event_key:'',
        name:'',
        location:'',
        date:'',
        num_teams:'',
        total_matches_played:0,
        qual_matches_played:0,
        qual_ranking:'',
        playoff_matches_played:0,
        playoff_result:'',
        wins:0,
        losses:0,
        ties:0,
        matches: []
      }
  
      // Append the name, location, and date to the objectToAppend
      objectToAppend.name = apiGetObject[i].name
      objectToAppend.location = `${apiGetObject[i].city}, ${apiGetObject[i].state_prov}, ${apiGetObject[i].country}`
      objectToAppend.date = apiGetObject[i].start_date
      objectToAppend.event_key = apiGetObject[i].key
  
  
      if (responseObject.events[i] === null) {
  
      } else {
  
        if (responseObject.events[i].qual) {
          objectToAppend.num_teams = responseObject.events[i].qual.num_teams
          objectToAppend.qual_ranking = responseObject.events[i].qual.ranking.rank
          objectToAppend.qual_matches_played = responseObject.events[i].qual.ranking.matches_played
    
          objectToAppend.wins = objectToAppend.wins + responseObject.events[i].qual.ranking.record.wins
          objectToAppend.losses = objectToAppend.losses + responseObject.events[i].qual.ranking.record.losses
          objectToAppend.ties = objectToAppend.ties + responseObject.events[i].qual.ranking.record.ties
        }
    
        if (responseObject.events[i].playoff) {
          objectToAppend.wins = objectToAppend.wins + responseObject.events[i].playoff.record.wins
          objectToAppend.losses = objectToAppend.losses + responseObject.events[i].playoff.record.losses
          objectToAppend.ties = objectToAppend.ties + responseObject.events[i].playoff.record.ties
  
          objectToAppend.playoff_matches_played = objectToAppend.playoff_matches_played + responseObject.events[i].playoff.record.wins
          objectToAppend.playoff_matches_played = objectToAppend.playoff_matches_played + responseObject.events[i].playoff.record.losses
          objectToAppend.playoff_matches_played = objectToAppend.playoff_matches_played + responseObject.events[i].playoff.record.ties
  
          if (responseObject.events[i].playoff.status === "eliminated") {
            objectToAppend.playoff_result = 'Elim'
          } else if (responseObject.events[i].playoff.status === "won") {
            objectToAppend.playoff_result = 'Won'
          }
        }
      }
  
      objectToAppend.total_matches_played = objectToAppend.playoff_matches_played + objectToAppend.qual_matches_played
  
      var url2 = `https://www.thebluealliance.com/api/v3/team/${search_team_string}/event/${objectToAppend.event_key}/matches`;
      const apiGetObject3 = JSON.parse(httpGet(url2,key))
    
      // for (let j=0;j<apiGetObject3;j++) {
      //   objectToAppend.matches.push(apiGetObject3[j])
      // }
  
      apiGetObject3.forEach(match => {
        objectToAppend.matches.push(match)
      });
  
      responseObject.event_results.push(objectToAppend)
  
      // This next part of the code needs to get the matches for the particular team in this particular event
      // use the api endpoint: team/team_key/event/event_key/matches
  
    }
  
    res.json(responseObject)
})

module.exports = router;