import React, { Component } from 'react';
import './styles.css';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebarWrapper">
                <div className="sidebarIcon" onClick={this.navigate("medicine")}></div>
                <div className="sidebarIcon" onClick={this.navigate("examinations")}></div>
                <div className="sidebarIcon" onClick={this.navigate("illnesses")}></div>
            </div>
        )
    }

    search() {
        //TODO
    }

    navigate = () => {
        //TODO
    }
}