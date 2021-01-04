// PRIVATE ROUTE TO RETRIEVE THE TEAMS SEARCHED, MAKE A REPORT, AND SEND BACK THE REPORT 
// YEAR DEPENDENT?: IDK
 /*
THIS ROUTE SHOULD GET:

TOTAL SEARCHES
TOTAL SEARCHES TODAY
TEAM MOST SEARCHED TODAY
TEAMS SEARCHED, SORTED BY HOW MANY SEARCHES THE TEAM HAS
 */

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

var mode = a => {
    a.sort((x, y) => x - y);
  
    var bestStreak = 1;
    var bestElem = a[0];
    var currentStreak = 1;
    var currentElem = a[0];
  
    for (let i = 1; i < a.length; i++) {
      if (a[i-1] !== a[i]) {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          bestElem = currentElem;
        }
  
        currentStreak = 0;
        currentElem = a[i];
      }
  
      currentStreak++;
    }
  
    return currentStreak > bestStreak ? currentElem : bestElem;
  };

router.get('/', async (req,res,next)=>{

    let apiGetList = []
    let teamsSearchedObject = {}

    const objectToReturn = {
        totalSearches:0,
        totalSearchesToday:0,
        mostSearchedToday:"No searches today",
        sortedTeamsSearched:[]
    }

    try {
        const posts = await Post.find()
        
        // Take each team searched, put in apiGetList
        for (let i=0;i<posts.length;i++) {
            apiGetList.push(posts[i])
        }
    } catch (err) {
        console.log(err)
    }

    // THIS SECTION GETS EVERY SEARCH ON THE DATABASE AND ORGANIZES IT FROM MOST SEARCHED TO LEAST SEARCHED
    
    for (let i=0;i<apiGetList.length;i++) {
        // If the team property is not in the list, create a new property in teamsSearchedObject
        // Else, add 1 to the value of the team (counts how many times the team is searched)

        let teamsInObject = Object.keys(teamsSearchedObject)
        let teamSearched = apiGetList[i].team

        if (teamsInObject.includes(teamSearched)) {
            teamsSearchedObject[teamSearched]++
        } else {
            teamsSearchedObject[teamSearched] = 1
        }
    }

    let sortedBySearchesArray = []
    for (var team in teamsSearchedObject) {
        sortedBySearchesArray.push([team, teamsSearchedObject[team]])
    }
    sortedBySearchesArray.sort(function(a,b) {
        objectToReturn.sortedTeamsSearched = b[1] - a[1];
    })

    objectToReturn.totalSearches = apiGetList.length;
    objectToReturn.sortedTeamsSearched = sortedBySearchesArray

    // END OF SECTION

    // THIS SECTION FINDS THE TOTAL SEARCHES TODAY AND THE TEAM MOST SEARCHED TODAY
    let teamsSearchedToday = []

    for (let i=0;i<apiGetList.length;i++) {
        const currentSearch = apiGetList[i]
        const currentDate = String(new Date())

        if (currentDate.slice(0,10) === String(currentSearch.date).slice(0,10)) {
            objectToReturn.totalSearchesToday++
            teamsSearchedToday.push(currentSearch.team)
        }

    }

    objectToReturn.mostSearchedToday = mode(teamsSearchedToday)
    Array(objectToReturn.sortedTeamsSearched)

    stringToReturn = `-----------------------------\nSEARCH REPORT\nTotal Searches: ${objectToReturn.totalSearches}\nTotal Searches Today: ${objectToReturn.totalSearchesToday}\nTeam Most Searched Today: ${objectToReturn.mostSearchedToday}\nAll Searches:\n`

    for (let i=0;i<objectToReturn.sortedTeamsSearched.length;i++) {
        stringToReturn = stringToReturn + `${objectToReturn.sortedTeamsSearched[i][0]}: ${objectToReturn.sortedTeamsSearched[i][1]}\n`
    }

    stringToReturn = stringToReturn + `-----------------------------`

    console.log(stringToReturn)
    res.json(stringToReturn)
})



module.exports = router;