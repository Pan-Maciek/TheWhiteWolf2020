import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import { withRouter } from 'react-router-dom';

class Topbar extends Component {
    state = { id: '' }
    render() {
        return (
            <div className="topbarWrapper">
                <input onChange={(val) => this.setState({ id: val.target.value })} type="text" className="idInput" placeholder="Podaj identyfikator"></input>
                <button onClick={this.search.bind(this)} className="searchButton">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        )
    }

    async search() {
        const uid = await axios({
            method: 'post',
            url: '/api/get_uid',
            data: { id: this.state.id }
        }).then(res => res.data)
        const user = await axios({
            method: 'post',
            url: '/api/get_personal',
            data: { uid }
        }).then(res => res.data)
        localStorage.setItem('uid', uid)
        localStorage.setItem('user', JSON.stringify(user))
        this.props.history.push(`/pacjent`)
    }
}
export default withRouter(Topbar)