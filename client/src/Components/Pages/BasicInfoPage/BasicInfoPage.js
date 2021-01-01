import React from 'react'
import './BasicInfoPage.css'

export class BasicInfoPage extends React.Component {

    render() {

        // Renders a certain header based on if the team had any events during the season
        const renderEventsHeader = () => {
            if (this.props.basicInfo.event_results.length === 0) {
                return <h3 id='event-results-h3'>This team did not play any events in 2020</h3>
            } else {
                return <h3 id='event-results-h3'>Event Results for 2020</h3>
            }
        }

        return (
            <section id='render-section'>

                <div id='header'>
                    <h2 id='robotics-link-logo'>RoboticsLink</h2>
                </div>

                <div id='teampage-title-div'>
                    <h3 id='teampage-title-h3'>Team {this.props.basicInfo.team_number}</h3>
                    <h1 id='teampage-title-h1'>{this.props.basicInfo.team_name}</h1>
                </div>

                <div id='general-info-div'>
                    <div className='general-info-div-fifth'><h3>Location:<br></br>{this.props.basicInfo.location}</h3></div>
                    <div className='general-info-div-fifth'><h3>District:<br></br>{this.props.basicInfo.district}</h3></div>
                    <div className='general-info-div-fifth'><h3>Record:<br></br>{this.props.basicInfo.num_wins}-{this.props.basicInfo.num_losses}-{this.props.basicInfo.num_ties}</h3></div>
                    <div className='general-info-div-fifth'><h3>District Rank:<br></br>{this.props.basicInfo.district_rank}</h3></div>
                    <div className='general-info-div-fifth'><h3>Ranking Points:<br></br>{this.props.basicInfo.ranking_points}</h3></div>
                </div>

                {renderEventsHeader()}
            

            </section>
        )
    }
}