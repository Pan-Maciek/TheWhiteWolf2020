import React, { Component } from 'react';
import './styles.css';

export default class Topbar extends Component {
    render() {
        return (
            <div id="topbarWrapper">
                <input type="text" id="idInput" placeholder="Podaj identyfikator"></input>
                <button onClick={this.search.bind(this)} id="searchButton">Szukaj</button>
            </div>
        )
    }

    search() {
        //TODO
    }
}