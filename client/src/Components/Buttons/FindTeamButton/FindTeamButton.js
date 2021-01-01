import React from 'react'
import './FindTeamButton.css'

export class FindTeamButton extends React.Component {
    render() {
        return (
            <div id='find-team-button' onClick={this.props.onClick}>
                <h2 id='find-team-text'>Go</h2>
            </div>
        )
    }
}