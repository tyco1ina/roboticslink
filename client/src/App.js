import React from 'react';
import './App.css';

import { FindTeamButton } from './Components/Buttons/FindTeamButton/FindTeamButton'
import { TeamPageFindTeamButton } from './Components/Buttons/TeamPageFindTeamButton/TeamPageFindTeamButton'
import { BasicInfoPage } from './Components/Pages/BasicInfoPage/BasicInfoPage'
import { TopTenPage } from './Components/Pages/TopTenPage/TopTenPage'
import { TopTenBox } from './Components/OtherComponents/TopTenBox/TopTenBox'
import { EventBox } from './Components/OtherComponents/EventBox/EventBox'
// import { UpdateBox } from './Components/OtherComponents/UpdateBox/UpdateBox'
import { BackButton } from './Components/Buttons/BackButton/BackButton'
import { FindTopTenButton } from './Components/Buttons/FindTopTenButton/FindTopTenButton'

// GLOBAL VARIABLE: CHECKS THE MOST RECENT SEARCH LOCATION SO THAT THIS THING KNOWS WHICH VARIABLE TO USE
let lastSearchLocation = null;

class App extends React.Component {

  constructor(props) {
    super(props);

    // BINDING ALL OF THE METHODS

    this.teamNumberInput = React.createRef()
    this.labelh4 = React.createRef()
    this.teamPageTeamNumberInput = React.createRef()
    this.statush4 = React.createRef()
    this.topTenStatush4 = React.createRef()

    this.state = {
      currentPage: "Main Page",
    }

    // METHODS TO DEAL WITH THE INPUTS THAT USERS GIVE

    this.getTeamInfo = async () => {

      let teamFound = false;

      let devMode = true
      let fetchString = ""
      if (devMode) {
        fetchString = fetchString + ""
      } else {
        fetchString = fetchString + "https://cors-anywhere.herokuapp.com/https://roboticslink.herokuapp.com"
      }

      const teamNumberInput = this.teamNumberInput.current.value;
      console.log(`Fetching info for team ${teamNumberInput}`)

      this.teamNumberInput.current.style.border = '1px solid black'
      console.log(this.labelh4)
      this.labelh4.current.style.color = "black"
      this.labelh4.current.innerText = `Connecting to server...`

      const data =  { teamNumberInput }
        const options = {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":'*',
            "Access-Control-Allow-Methods": 'POST'
          },
          body: JSON.stringify(data),
        }
        
      await fetch(fetchString + "/api/getconnection", options)
        .then(res=>res.json())
        .then(res=>{
          this.labelh4.current.innerText = `Fetching basic info for team ${teamNumberInput}...`
      })
      // FETCH BASIC TEAM INFO
      await fetch(fetchString + "/api/getbasicteaminfo", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Basic info received")

        this.basicInfoObject = res

        if (res.team_name===undefined) {
          this.teamNumberInput.current.style.border = '1px solid red'
          this.labelh4.current.style.color = "red"
          this.labelh4.current.innerText = `'${teamNumberInput}' is not a valid team number. Try Again:`
        } else {
          this.labelh4.current.innerText = `Fetching district for team ${teamNumberInput}...`
          teamFound = true;
        }
      })

      if (teamFound) {
      lastSearchLocation = "main"
      //FETCH DISTRICT INFO
      // await fetch(fetchString + "/api/getdistrictinfo", options)
      // .then(res=>res.json())
      // .then(res=>{
      //   console.log("[STATUS] District info received")

      //   this.districtInfoObject = res
      //   this.labelh4.current.innerText = `Fetching rank info for team ${teamNumberInput}...`
      // })
      // FETCH RANK INFO
      await fetch(fetchString + "/api/getrankinfo", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Rank info received")

        this.rankInfoObject = res
        this.labelh4.current.innerText = `Fetching event info for team ${teamNumberInput}...`
      })
      // // FETCH WINS LOSSES TIES
      await fetch(fetchString + "/api/getwinslossesties", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Win-lose-tie info received")

        this.winsLossesTiesInfoObject = res
        this.labelh4.current.innerText = `Fetching event results for team ${teamNumberInput}...`
      })
      // // FETCH EVENT RESULTS
      await fetch(fetchString + "/api/geteventresults", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Event info received")

        this.eventResultsInfoObject = res
        console.log(this.eventResultsInfoObject)
        this.labelh4.current.innerText = `Fetching match results for team ${teamNumberInput}...`
      })

      // FETCH MATCH RESULTS
      await fetch(fetchString + "/api/getmatchresults", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Match info received")

        this.matchResultsInfoObject = res
      })

      // RECONSTRUCTING RESPONSE OBJECT
      this.infoObject = {
        ...this.basicInfoObject,
        ...this.districtInfoObject,
        ...this.rankInfoObject,
        ...this.winsLossesTiesInfoObject,
        ...this.eventResultsInfoObject,
        ...this.matchResultsInfoObject
      }

      console.log(this.infoObject)

      if (this.infoObject.team_name===undefined) {
        this.teamNumberInput.current.style.border = '1px solid red'
        this.labelh4.current.style.color = "red"
        this.labelh4.current.innerText = `'${teamNumberInput}' is not a valid team number. Try Again:`
      } else {
        this.setState({currentPage: "Team Page"})
      }

    } else {

    }
    }

    this.getTeamInfoTeamPage = async () => {

      let teamFound = false;

      let devMode = true
      let fetchString = ""
      if (devMode) {
        fetchString = fetchString + ""
      } else {
        fetchString = fetchString + "https://cors-anywhere.herokuapp.com/https://roboticslink.herokuapp.com"
      }

      const teamNumberInput = this.teamPageTeamNumberInput.current.value;
      console.log(`Fetching info for team ${teamNumberInput}`)

      this.teamPageTeamNumberInput.current.style.border = '1px solid black'
      console.log(this.statush4)
      this.statush4.current.style.color = "black"
      this.statush4.current.innerText = `Connecting to server...`

      const data =  { teamNumberInput }
        const options = {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":'*',
            "Access-Control-Allow-Methods": 'POST'
          },
          body: JSON.stringify(data),
        }
        
      await fetch(fetchString + "/api/getconnection", options)
        .then(res=>res.json())
        .then(res=>{
          this.statush4.current.innerText = `Fetching basic info for team ${teamNumberInput}...`
      })
      // FETCH BASIC TEAM INFO
      await fetch(fetchString + "/api/getbasicteaminfo", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Basic info received")

        this.basicInfoObject = res

        if (res.team_name===undefined) {
          this.teamPageTeamNumberInput.current.style.border = '1px solid red'
          this.statush4.current.style.color = "red"
          this.statush4.current.innerText = `'${teamNumberInput}' is not a valid team number. Try Again:`
        } else {
          this.statush4.current.innerText = `Fetching district for team ${teamNumberInput}...`
          teamFound = true;
        }
      })

      if (teamFound) {
      lastSearchLocation = "teampage"
      //FETCH DISTRICT INFO
      // await fetch(fetchString + "/api/getdistrictinfo", options)
      // .then(res=>res.json())
      // .then(res=>{
      //   console.log("[STATUS] District info received")

      //   this.districtInfoObject = res
      //   this.statush4.current.innerText = `Fetching rank info for team ${teamNumberInput}...`
      // })
      // FETCH RANK INFO
      await fetch(fetchString + "/api/getrankinfo", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Rank info received")

        this.rankInfoObject = res
        this.statush4.current.innerText = `Fetching event info for team ${teamNumberInput}...`
      })
      // // FETCH WINS LOSSES TIES
      await fetch(fetchString + "/api/getwinslossesties", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Win-lose-tie info received")

        this.winsLossesTiesInfoObject = res
        this.statush4.current.innerText = `Fetching event results for team ${teamNumberInput}...`
      })
      // // FETCH EVENT RESULTS
      await fetch(fetchString + "/api/geteventresults", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Event info received")

        this.eventResultsInfoObject = res
        console.log(this.eventResultsInfoObject)
        this.statush4.current.innerText = `Fetching match results for team ${teamNumberInput}...`
      })

      // FETCH MATCH RESULTS
      await fetch(fetchString + "/api/getmatchresults", options)
      .then(res=>res.json())
      .then(res=>{
        console.log("[STATUS] Match info received")

        this.matchResultsInfoObject = res
      })

      // RECONSTRUCTING RESPONSE OBJECT
      this.infoObject = {
        ...this.basicInfoObject,
        ...this.districtInfoObject,
        ...this.rankInfoObject,
        ...this.winsLossesTiesInfoObject,
        ...this.eventResultsInfoObject,
        ...this.matchResultsInfoObject
      }

      console.log(this.infoObject)

      // GET RID OF THE LABEL AT THE TOP ONCE THE SEARCH IS COMPLETE
      this.statush4.current.innerText = ''

      if (this.infoObject.team_name===undefined) {
        this.teamPageTeamNumberInput.current.style.border = '1px solid red'
        this.status.current.style.color = "red"
        this.statush4.current.innerText = `'${teamNumberInput}' is not a valid team number. Try Again:`
      } else {
        this.setState({currentPage: "Team Page"})
      }

    } else {

    }
    }

    this.returnToMainScreen = () => {
      this.setState({currentPage: "Main Page"})
    }

    this.getTopTenTeams = async () => {

      this.topTenStatush4.current.innerText = "Getting the top ten teams..."

      let devMode = true
      let fetchString = ""
      if (devMode) {
        fetchString = fetchString + ""
      } else {
        fetchString = fetchString + "https://cors-anywhere.herokuapp.com/https://roboticslink.herokuapp.com"
      }

      const options = {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":'*',
          "Access-Control-Allow-Methods": 'POST'
        },
      }
      
      await fetch(fetchString + "/api/gettoptenteams", options)
        .then(res=>res.json())
        .then(res=>{
          this.topTenTeamsArray = res

          this.topTenStatush4.current.innerText = ""
          this.setState({currentPage: "Top Ten Page"})
      })
    }
  }
  // METHOD TO GET ALL OF THE NECESSARY INFO

  renderCorrectArray = () => {
    console.log(lastSearchLocation)
    if (lastSearchLocation === "main") {
      return Array.from(Array(this.infoObject.event_results.length)).map((x, i) => <EventBox team={this.teamNumberInput.current.value} matchInfo={this.infoObject.match_results} eventInfo={this.infoObject.event_results[i]} />)
    } else {
      return Array.from(Array(this.infoObject.event_results.length)).map((x, i) => <EventBox team={this.teamPageTeamNumberInput.current.value} matchInfo={this.infoObject.match_results} eventInfo={this.infoObject.event_results[i]} />)
    }
  }

  render() {

      if (this.state.currentPage === "Main Page") {
      return (
        <section>
          <div id='title-div'>
              <h1 id='title-h1'>RoboticsLink</h1>
              <h3 id='title-h3'>By Team 5804: TORCH</h3>
          </div>
          <div id='search-div'>
              <h4 id='label-h4' ref={this.labelh4}>Search for a Team by #:</h4>
              <input id='team-number-input' type='text' ref={this.teamNumberInput}></input>
          </div>

          <h4 id='top-ten-status-h4' ref={this.topTenStatush4}></h4>

          <FindTopTenButton onClick={this.getTopTenTeams}/>
          <FindTeamButton onClick={this.getTeamInfo}/>

        </section>
      )
    } else if (this.state.currentPage === "Team Page") {
      return (
        <section>
          <div id='team-page-input-div'>
            <input id='team-page-team-number-input' type='text' ref={this.teamPageTeamNumberInput}></input>
            <TeamPageFindTeamButton onClick={this.getTeamInfoTeamPage}/>
          </div>
          <h4 id='status-h4' ref={this.statush4}> </h4>
          <BackButton onClick={this.returnToMainScreen}/>
          <BasicInfoPage basicInfo={this.infoObject} eventsInfo={this.infoObject.event_results}/>

          {/* Sometimes this error will happen: "Warning: Each child in a list should have a unique "key" prop." */}

          {this.renderCorrectArray()}
        </section>
      )
    } else if (this.state.currentPage === "Top Ten Page") {
      return (
        <section>
          <div id='team-page-input-div'>
            <input id='team-page-team-number-input' type='text' ref={this.teamPageTeamNumberInput}></input>
            <TeamPageFindTeamButton onClick={this.getTeamInfoTeamPage}/>
          </div>
          <h4 id='status-h4' ref={this.statush4}> </h4>
          <BackButton onClick={this.returnToMainScreen}/>
          <TopTenPage/>

          {Array.from(Array(10)).map((x, i) => <TopTenBox currentNumber={i+1} teamNumber={this.topTenTeamsArray[i][0]} teamName={this.topTenTeamsArray[i][1]}/>)}
        </section>
      )
    }
  } 
}

export default App;