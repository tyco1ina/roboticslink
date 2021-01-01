import React from 'react'
import './TopTenBox.css'

export class TopTenBox extends React.Component {

    render() {
        return (
            <div id='top-ten-box'>
                <div id='top-ten-box-number-div'>
                    <h1 id='number-box-number'>{this.props.currentNumber}</h1>
                </div>

                <h1 id='team-indication'>{this.props.teamName}</h1>
                <h3 id='team-indication-number'>Team {this.props.teamNumber}</h3>
            </div>
        )
    }
}