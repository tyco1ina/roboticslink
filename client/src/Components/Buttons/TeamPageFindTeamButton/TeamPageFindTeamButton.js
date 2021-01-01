import React from 'react'
import './TeamPageFindTeamButton.css'

export class TeamPageFindTeamButton extends React.Component {
    render() {
        return (
            <div id='team-page-find-team-button' onClick={this.props.onClick}>
                <h2 id='team-page-find-team-text'>Go</h2>
            </div>
        )
    }
}