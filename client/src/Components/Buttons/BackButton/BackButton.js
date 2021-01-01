import React from 'react'
import './BackButton.css'

export class BackButton extends React.Component {
    render() {
        return (
            <div id='back-button' onClick={this.props.onClick}>
                <h2 id='back-text'>Back</h2>
            </div>
        )
    }
}