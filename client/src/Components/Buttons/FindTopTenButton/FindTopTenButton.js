import React from 'react'
import './FindTopTenButton.css'

export class FindTopTenButton extends React.Component {
    render() {
        return (
            <div id='find-top-ten-button' onClick={this.props.onClick}>
                <h2 id='find-top-ten-text'>Top Ten Teams Searched</h2>
            </div>
        )
    }
}