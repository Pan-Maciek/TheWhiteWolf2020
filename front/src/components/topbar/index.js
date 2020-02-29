import React, { Component } from 'react';
import './styles.css';

export default class Topbar extends Component {
    render() {
        return (
            <div className="topbarWrapper">
                <input type="text" className="idInput" placeholder="Podaj identyfikator"></input>
                <button onClick={this.search.bind(this)} className="searchButton">Szukaj</button>
            </div>
        )
    }

    search() {
        //TODO
    }
}