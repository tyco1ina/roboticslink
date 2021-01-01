import React from 'react'
import './MatchBox.css'

export class MatchBox extends React.Component {

    constructor(props) {
        super(props)
        
        this.matchBoxDiv = React.createRef()

        this.state = {
            status:"hidden"
        }

        this.menuToggle = this.menuToggle.bind(this)

    }


    menuToggle = () => {
        if (this.state.status==='hidden') {
            this.setState({status: "showing"})
        } else if (this.state.status ==='showing') {
            this.setState({status: "hidden"})
        }
    }

    deriveMatchName() {
        let string_to_return = ''

        if (this.props.matchInfo.comp_level === 'f') {
            string_to_return+="Finals Match"
        } else if (this.props.matchInfo.comp_level === 'sf') {
            string_to_return+="Semifinals Match"
        } else if (this.props.matchInfo.comp_level === 'qf') {
            string_to_return+="Quarterfinals Match"
        } else if (this.props.matchInfo.comp_level === 'qm') {
            string_to_return+="Qualifying Match"
        }

        string_to_return+=" #"
        string_to_return+=this.props.matchInfo.match_number

        return string_to_return
        
    }

    deriveBlueRobotList() {
        let list_to_return = []
        for (let i=0;i<this.props.matchInfo.alliances.blue.team_keys.length;i++) {
            list_to_return.push(this.props.matchInfo.alliances.blue.team_keys[i].slice(3,7))
        }
        return list_to_return
    }

    deriveRedRobotList() {
        let list_to_return = []
        for (let i=0;i<this.props.matchInfo.alliances.red.team_keys.length;i++) {
            list_to_return.push(this.props.matchInfo.alliances.red.team_keys[i].slice(3,7))
        }
        return list_to_return
    }

    deriveVideoLink() {
        if (this.props.matchInfo.videos[0] === undefined) {
            return "Could not find video"
        } else {
            const key = this.props.matchInfo.videos[0].key
            return `https://www.youtube.com/watch?v=${key}`
        }
    }

    determineResult() {
        const winning_alliance = this.props.matchInfo.winning_alliance

        if (winning_alliance === "blue") {
            if (this.props.matchInfo.alliances.blue.team_keys.includes(`frc${this.props.team}`)) {
                return "Won"
            } else {
                return "Lost"
            }
        } else if (winning_alliance === "red") {
            if (this.props.matchInfo.alliances.red.team_keys.includes(`frc${this.props.team}`)) {
                return "Won"
            } else {
                return "Lost"
            }
        } else {
            return "Tie"
        }
    }

    determineRedRungLevel() {
        const red_rung_level_string = this.props.matchInfo.score_breakdown.red.endgameRungIsLevel

        if (red_rung_level_string === "IsLevel") {
            return "Yes"
        } else {
            return "No"
        }
    }

    determineBlueRungLevel() {
        const blue_rung_level_string = this.props.matchInfo.score_breakdown.blue.endgameRungIsLevel

        if (blue_rung_level_string === "IsLevel") {
            return "Yes"
        } else {
            return "No"
        }
    }

    render() {
        this.match_name = this.deriveMatchName()

        this.red_team_list = this.deriveRedRobotList()
        this.blue_team_list = this.deriveBlueRobotList()

        this.video_link = this.deriveVideoLink()

        this.result = this.determineResult();

        this.red_rung_level = this.determineRedRungLevel()
        this.blue_rung_level = this.determineBlueRungLevel()


        const renderVideoLink = () => {
            if (this.props.matchInfo.videos[0] === undefined) {
                return <h4 id='video-link-h4'>Could not find a video for this match</h4>
            } else {
                const key = this.props.matchInfo.videos[0].key
                return <h4 id='video-link-h4'>Video: <a href={`https://www.youtube.com/watch?v=${key}`} target="_blank">{this.video_link}</a></h4>
            }
        }

        const videoLink = renderVideoLink()

        if (this.state.status === "hidden") {

            return (

                <div id='match-box-div' style={{height:"100px"}} ref={this.matchBoxDiv}>
                    <div className='menu-toggle-button'><h3 className='see-more-h3' onClick={this.menuToggle}>See More</h3></div>
                    <h1 id='match-name-h1'>{this.match_name}: {this.result}</h1>
                    {videoLink}

                    <div id='blue-info-div'>
                        <h1 className='info-div-title'>Blue: {this.props.matchInfo.score_breakdown.blue.totalPoints}</h1>
                        <div className='info-div-text'>
                            <h5>Teams: {this.blue_team_list[0]}, {this.blue_team_list[1]}, {this.blue_team_list[2]}</h5>
                            <h5>Ranking points gained: {this.props.matchInfo.score_breakdown.blue.rp}</h5>
                            <br></br>
                            <h5>Total autonomous points: {this.props.matchInfo.score_breakdown.blue.autoPoints}</h5>
                            <h5>{this.blue_team_list[0]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot1}</h5>
                            <h5>{this.blue_team_list[1]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot2}</h5>
                            <h5>{this.blue_team_list[2]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot3}</h5>
                            <h5>Cells in bottom goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsBottom}</h5>
                            <h5>Cells in outer top goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsOuter}</h5>
                            <h5>Cells in inner top goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsInner}</h5>
                            <br></br>
                            <h5>Total teleop points: {this.props.matchInfo.score_breakdown.blue.teleopPoints}</h5>
                            <h5>Cells in bottom goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsBottom}</h5>
                            <h5>Cells in outer top goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsOuter}</h5>
                            <h5>Cells in inner top goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsInner}</h5>
                            <h5>{this.blue_team_list[0]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot1}</h5>
                            <h5>{this.blue_team_list[1]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot2}</h5>
                            <h5>{this.blue_team_list[2]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot3}</h5>
                            <h5>Rung level: {this.blue_rung_level}</h5>
                        </div>
                    </div>
                    <div id='red-info-div'>
                        <h1 className='info-div-title'>Red: {this.props.matchInfo.score_breakdown.red.totalPoints}</h1>
                        <div className='info-div-text'>
                            <h5>Teams: {this.red_team_list[0]}, {this.red_team_list[1]}, {this.red_team_list[2]}</h5>
                            <h5>Ranking points gained: {this.props.matchInfo.score_breakdown.red.rp}</h5>
                            <br></br>
                            <h5>Total autonomous points: {this.props.matchInfo.score_breakdown.red.autoPoints}</h5>
                            <h5>{this.red_team_list[0]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot1}</h5>
                            <h5>{this.red_team_list[1]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot2}</h5>
                            <h5>{this.red_team_list[2]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot3}</h5>
                            <h5>Cells in bottom goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsBottom}</h5>
                            <h5>Cells in outer top goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsOuter}</h5>
                            <h5>Cells in inner top goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsInner}</h5>
                            <br></br>
                            <h5>Total teleop points: {this.props.matchInfo.score_breakdown.red.teleopPoints}</h5>
                            <h5>Cells in bottom goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsBottom}</h5>
                            <h5>Cells in outer top goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsOuter}</h5>
                            <h5>Cells in inner top goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsInner}</h5>
                            <h5>{this.red_team_list[0]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot1}</h5>
                            <h5>{this.red_team_list[1]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot2}</h5>
                            <h5>{this.red_team_list[2]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot3}</h5>
                            <h5>Rung level: {this.red_rung_level}</h5>
                        </div>
                    </div>

                </div>
            )

        } else if (this.state.status === "showing") {

            return (

                <div id='match-box-div' style={{height:"480px"}} ref={this.matchBoxDiv} onClick={this.menuToggle}>
                    <div className='menu-toggle-button'><h3 className='see-more-h3' onClick={this.menuToggle}>See Less</h3></div>
                        <h1 id='match-name-h1'>{this.match_name}: {this.result}</h1>
                        {renderVideoLink()}

                        <div id='blue-info-div'>
                            <h1 className='info-div-title'>Blue: {this.props.matchInfo.score_breakdown.blue.totalPoints}</h1>
                            <div className='info-div-text'>
                                <h5>Teams: {this.blue_team_list[0]}, {this.blue_team_list[1]}, {this.blue_team_list[2]}</h5>
                                <h5>Ranking points gained: {this.props.matchInfo.score_breakdown.blue.rp}</h5>
                                <br></br>
                                <h5>Total autonomous points: {this.props.matchInfo.score_breakdown.blue.autoPoints}</h5>
                                <h5>{this.blue_team_list[0]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot1}</h5>
                                <h5>{this.blue_team_list[1]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot2}</h5>
                                <h5>{this.blue_team_list[2]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot3}</h5>
                                <h5>Cells in bottom goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsBottom}</h5>
                                <h5>Cells in outer top goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsOuter}</h5>
                                <h5>Cells in inner top goal (autonomous): {this.props.matchInfo.score_breakdown.blue.autoCellsInner}</h5>
                                <br></br>
                                <h5>Total teleop points: {this.props.matchInfo.score_breakdown.blue.teleopPoints}</h5>
                                <h5>Cells in bottom goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsBottom}</h5>
                                <h5>Cells in outer top goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsOuter}</h5>
                                <h5>Cells in inner top goal (teleop): {this.props.matchInfo.score_breakdown.blue.teleopCellsInner}</h5>
                                <h5>{this.blue_team_list[0]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot1}</h5>
                                <h5>{this.blue_team_list[1]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot2}</h5>
                                <h5>{this.blue_team_list[2]} endgame status: {this.props.matchInfo.score_breakdown.blue.endgameRobot3}</h5>
                                <h5>Rung level: {this.blue_rung_level}</h5>
                            </div>
                        </div>
                        <div id='red-info-div'>
                            <h1 className='info-div-title'>Red: {this.props.matchInfo.score_breakdown.red.totalPoints}</h1>
                            <div className='info-div-text'>
                                <h5>Teams: {this.red_team_list[0]}, {this.red_team_list[1]}, {this.red_team_list[2]}</h5>
                                <h5>Ranking points gained: {this.props.matchInfo.score_breakdown.red.rp}</h5>
                                <br></br>
                                <h5>Total autonomous points: {this.props.matchInfo.score_breakdown.red.autoPoints}</h5>
                                <h5>{this.red_team_list[0]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot1}</h5>
                                <h5>{this.red_team_list[1]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot2}</h5>
                                <h5>{this.red_team_list[2]} crossed init line: {this.props.matchInfo.score_breakdown.blue.initLineRobot3}</h5>
                                <h5>Cells in bottom goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsBottom}</h5>
                                <h5>Cells in outer top goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsOuter}</h5>
                                <h5>Cells in inner top goal (autonomous): {this.props.matchInfo.score_breakdown.red.autoCellsInner}</h5>
                                <br></br>
                                <h5>Total teleop points: {this.props.matchInfo.score_breakdown.red.teleopPoints}</h5>
                                <h5>Cells in bottom goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsBottom}</h5>
                                <h5>Cells in outer top goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsOuter}</h5>
                                <h5>Cells in inner top goal (teleop): {this.props.matchInfo.score_breakdown.red.teleopCellsInner}</h5>
                                <h5>{this.red_team_list[0]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot1}</h5>
                                <h5>{this.red_team_list[1]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot2}</h5>
                                <h5>{this.red_team_list[2]} endgame status: {this.props.matchInfo.score_breakdown.red.endgameRobot3}</h5>
                                <h5>Rung level: {this.red_rung_level}</h5>
                            </div>
                        </div>

                    </div>
            )
        }
    }
}