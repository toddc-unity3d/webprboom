import React, { Component } from 'react';

import { Line } from 'rc-progress';
import './Loading.css';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        setInterval(() => this.setState({ percent: this.state.percent + 1}), 100);
    }

    state = {
        percent: 0
    };

    render() {
        return (    
            <div className="Loading">
                <div className="Loading-inner">
                    <Line percent={this.state.percent} strokeWidth="4" strokeColor="red" trailColor="#999999" />
                </div>
            </div> 
        );
    }    
}
