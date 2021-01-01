// ROUTE TO RETRIEVE THE TEAMS SEARCHED AND SEND BACK THE TOP TEN MOST SEARCHED TEAMS
// YEAR DEPENDENT?: IDK

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

router.get('/', async (req,res,next)=>{

    let apiGetList = []
    let teamsSearchedObject = {}

    try {
        const posts = await Post.find()
        
        // Take each team searched, put in apiGetList
        for (let i=0;i<posts.length;i++) {
            apiGetList.push(posts[i])
        }
    } catch (err) {
        console.log(err)
    }
    
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

    // SORT THE TEAMS SEARCHED BY HOW MANY SEARCHES THEY HAVE
    let sortedBySearchesArray = []
    for (var team in teamsSearchedObject) {
        sortedBySearchesArray.push([team, teamsSearchedObject[team]])
    }
    sortedBySearchesArray.sort(function(a,b) {
        return b[1] - a[1];
    })

    // RETRIEVE THE TOP TEN TEAMS (REMOVE IF WRITING GET ALL TEAMS FUNCTION)
    let topTenTeamsArray = []
    for (let i=0;i<10;i++) {
        topTenTeamsArray.push(sortedBySearchesArray[i][0])
    }

    let arrayToReturn = []

    // GET THE NICKNAME OF THE TEAM AND PUSH THE TEAM NUMBER AND THE NICKNAME TO THE TOP TEN TEAMS OBJECT
    var key = process.env.REACT_APP_API_KEY;
    for (let i=0;i<10;i++) {
        var url = `https://www.thebluealliance.com/api/v3/team/frc${topTenTeamsArray[i]}`;
        let apiGetObject = JSON.parse(httpGet(url,key))

        arrayToReturn.push([topTenTeamsArray[i], apiGetObject.nickname])
    }

    res.json(arrayToReturn)
})



module.exports = router;