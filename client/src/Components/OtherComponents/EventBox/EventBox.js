import React from 'react'
import './EventBox.css'

import { MatchBox } from '../MatchBox/MatchBox'

export class EventBox extends React.Component {

    constructor(props) {
        super(props)

        this.eventBoxDiv = React.createRef()
    }

    getWinPercent() {
        if (this.props.eventInfo.total_matches_played === 0){
            return "N/A"
        } else {
            const winDecimal = this.props.eventInfo.wins / this.props.eventInfo.total_matches_played
            const winDecimalRounded = winDecimal.toFixed(2)
    
            return `${(winDecimalRounded*100).toFixed(0)}%`
        }
    }

    getClimbPercent() {

        let teamObject = {
            team:'',
            number:''
        }

        let total_matches = 0
        let matches_climbed = 0

        for(let i=0;i<this.props.matchInfo.length;i++) {
            if (this.props.matchInfo[i].event_key === this.props.eventInfo.event_key) {
                total_matches++

                
                if (this.props.matchInfo[i].alliances.blue.team_keys.includes(`frc${this.props.team}`)) {
                    teamObject.team = "blue"

                    const index_of_team = this.props.matchInfo[i].alliances.blue.team_keys.indexOf(`frc${this.props.team}`)
                    teamObject.number = index_of_team

                    if (teamObject.number === 0) {
                        if (this.props.matchInfo[i].score_breakdown.blue.endgameRobot1==='Hang') {
                            matches_climbed++
                        } else {

                        }
                    } else if (teamObject.number === 1) {
                        if (this.props.matchInfo[i].score_breakdown.blue.endgameRobot2==='Hang') {
                            matches_climbed++
                        } else {
                            
                        }
                    } else if (teamObject.number === 2) {
                        if (this.props.matchInfo[i].score_breakdown.blue.endgameRobot3==='Hang') {
                            matches_climbed++
                        } else {
                            
                        }
                    }
                } else {
                    teamObject.team = "red"

                    const index_of_team = this.props.matchInfo[i].alliances.red.team_keys.indexOf(`frc${this.props.team}`)
                    teamObject.number = index_of_team

                    if (teamObject.number === 0) {
                        if (this.props.matchInfo[i].score_breakdown.red.endgameRobot1==='Hang') {
                            matches_climbed++
                        } else {

                        }
                    } else if (teamObject.number === 1) {
                        if (this.props.matchInfo[i].score_breakdown.red.endgameRobot2==='Hang') {
                            matches_climbed++
                        } else {
                            
                        }
                    } else if (teamObject.number === 2) {
                        if (this.props.matchInfo[i].score_breakdown.red.endgameRobot3==='Hang') {
                            matches_climbed++
                        } else {
                            
                        }
                    }
                } 

        

            } else {

            }
        }

        if (total_matches === 0) {
            return "N/A"
        } else {
            return `${((matches_climbed/total_matches).toFixed(2))*100}%`
        }
    }

    getCrossLinePercent() {
        let teamObject = {
            team:'',
            number:''
        }

        let total_matches = 0
        let matches_cross_line = 0

        for(let i=0;i<this.props.matchInfo.length;i++) {
            if (this.props.matchInfo[i].event_key === this.props.eventInfo.event_key) {
                total_matches++

                
                if (this.props.matchInfo[i].alliances.blue.team_keys.includes(`frc${this.props.team}`)) {
                    teamObject.team = "blue"

                    const index_of_team = this.props.matchInfo[i].alliances.blue.team_keys.indexOf(`frc${this.props.team}`)
                    teamObject.number = index_of_team

                    if (teamObject.number === 0) {
                        if (this.props.matchInfo[i].score_breakdown.blue.initLineRobot1==='Exited') {
                            matches_cross_line++
                        } else {

                        }
                    } else if (teamObject.number === 1) {
                        if (this.props.matchInfo[i].score_breakdown.blue.initLineRobot2==='Exited') {
                            matches_cross_line++
                        } else {
                            
                        }
                    } else if (teamObject.number === 2) {
                        if (this.props.matchInfo[i].score_breakdown.blue.initLineRobot3==='Exited') {
                            matches_cross_line++
                        } else {
                            
                        }
                    }
                } else {
                    teamObject.team = "red"

                    const index_of_team = this.props.matchInfo[i].alliances.red.team_keys.indexOf(`frc${this.props.team}`)
                    teamObject.number = index_of_team

                    if (teamObject.number === 0) {
                        if (this.props.matchInfo[i].score_breakdown.red.initLineRobot1==='Exited') {
                            matches_cross_line++
                        } else {

                        }
                    } else if (teamObject.number === 1) {
                        if (this.props.matchInfo[i].score_breakdown.red.initLineRobot2==='Exited') {
                            matches_cross_line++
                        } else {
                            
                        }
                    } else if (teamObject.number === 2) {
                        if (this.props.matchInfo[i].score_breakdown.red.initLineRobot3==='Exited') {
                            matches_cross_line++
                        } else {
                            
                        }
                    }
                } 

        

            } else {

            }
        }

        if (total_matches === 0) {
            return "N/A"
        } else {
            return `${((matches_cross_line/total_matches).toFixed(2))*100}%`
        }
    }

    getAveragePoints () {
        // For each match, get the points the alliance earned during the match and find the average

        let total_points = 0
        let total_matches = 0

        for(let i=0;i<this.props.matchInfo.length;i++) {
            if (this.props.matchInfo[i].event_key === this.props.eventInfo.event_key) {
                total_matches++

                
                if (this.props.matchInfo[i].alliances.blue.team_keys.includes(`frc${this.props.team}`)) {
                    total_points = total_points + this.props.matchInfo[i].alliances.blue.score
                } else {
                    total_points = total_points + this.props.matchInfo[i].alliances.red.score
                } 

            } else {

            }
        }

        if (total_matches === 0) {
            return "N/A"
        } else {
            return `${((total_points/total_matches).toFixed(1))}`
        }
    }

    getNumTeams() {
        if (this.props.eventInfo.num_teams === 0) {
            return "N/A"
        } else {
            return this.props.eventInfo.num_teams
        }
    }

    getQualifyingrank() {
        if (this.props.eventInfo.qual_ranking === null || this.props.eventInfo.qual_ranking === undefined|| this.props.eventInfo.qual_ranking === '') {
            return "N/A"
        } else {
            return this.props.eventInfo.qual_ranking
        }
    }

    getPlayoffResults() {
        if (this.props.eventInfo.playoff_result === null || this.props.eventInfo.playoff_result === undefined || this.props.eventInfo.playoff_result === '') {
            return "N/A"
        } else {
            return this.props.eventInfo.playoff_result
        }
    }

    sortMatches() {
        let sortedMatchesArray = []

        for (let i=0;i<this.props.eventInfo.matches.length;i++) {

            if (this.props.eventInfo.matches[i].comp_level === "qm") {
                sortedMatchesArray.push(this.props.eventInfo.matches[i])
            }
        }

        for (let i=0;i<this.props.eventInfo.matches.length;i++) {
            console.log(this.props.eventInfo.matches[i])

            if (this.props.eventInfo.matches[i].comp_level === "qf") {
                sortedMatchesArray.push(this.props.eventInfo.matches[i])
            }
        }

        for (let i=0;i<this.props.eventInfo.matches.length;i++) {
            console.log(this.props.eventInfo.matches[i])

            if (this.props.eventInfo.matches[i].comp_level === "sf") {
                sortedMatchesArray.push(this.props.eventInfo.matches[i])
            }
        }

        for (let i=0;i<this.props.eventInfo.matches.length;i++) {
            console.log(this.props.eventInfo.matches[i])

            if (this.props.eventInfo.matches[i].comp_level === "f") {
                sortedMatchesArray.push(this.props.eventInfo.matches[i])
            }
        }

        return sortedMatchesArray
    }

    render() {

        console.log(this.props.eventInfo)

        // Get all of the necessary information
        const eventName = this.props.eventInfo.name
        const eventLocation = this.props.eventInfo.location
        const eventDate = this.props.eventInfo.date

        const numberOfTeams = this.getNumTeams()
        const totalMatches = this.props.eventInfo.total_matches_played
        const totalQualMatches = this.props.eventInfo.qual_matches_played
        const qualifyingRank = this.getQualifyingrank()
        const totalPlayoffMatches = this.props.eventInfo.playoff_matches_played
        const playoffResults = this.getPlayoffResults();
        const averagePointsPerMatch = this.getAveragePoints()
        const winRate = this.getWinPercent()
        const crossInitLineRate = this.getCrossLinePercent()
        const endgameHangRate = this.getClimbPercent()
        const wins = this.props.eventInfo.wins
        const losses = this.props.eventInfo.losses
        const ties = this.props.eventInfo.ties

        const sortedMatches = this.sortMatches();

        return(
            <div id='event-box-div' ref={this.eventBoxDiv} onClick={this.testRef}>
                <h3 className='event-indicator-h3'>Event</h3>
                <h1>{eventName}</h1>
                <div id='general-event-info-div'>
                    <div className='general-event-info-div-third'><h3>Location:<br></br>{eventLocation}</h3></div>
                    <div className='general-event-info-div-third'><h3>W-L-T:<br></br>{wins}-{losses}-{ties}</h3></div>
                    <div className='general-event-info-div-third'><h3>Date:<br></br>{eventDate}</h3></div>
                </div>

                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Number of Teams</h3>
                        <h3 className='stats-div-number'>{numberOfTeams}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Total Matches Played</h3>
                        <h3 className='stats-div-number'>{totalMatches}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Qualifying Matches Played</h3>
                        <h3 className='stats-div-number'>{totalQualMatches}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Qualifying Rank</h3>
                        <h3 className='stats-div-number'>{qualifyingRank}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Playoff Matches Played</h3>
                        <h3 className='stats-div-number'>{totalPlayoffMatches}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Playoff Results</h3>
                        <h3 className='stats-div-number'>{playoffResults}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Avg Points Per Match</h3>
                        <h3 className='stats-div-number'>{averagePointsPerMatch}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Win Rate</h3>
                        <h3 className='stats-div-number'>{winRate}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Crossed Initiation Line Rate</h3>
                        <h3 className='stats-div-number'>{crossInitLineRate}</h3>
                    </div>
                </div>
                <div className='stats-div'>
                    <div className='stats-div-title'>
                        <h3 className='stats-div-title-h3'>Endgame Hang Rate</h3>
                        <h3 className='stats-div-number'>{endgameHangRate}</h3>
                    </div>
                </div>

                {Array.from(Array(this.props.eventInfo.matches.length)).map((x, i) => <MatchBox team={this.props.team} matchInfo={sortedMatches[i]}/>)}

            </div>
        )
    }
}