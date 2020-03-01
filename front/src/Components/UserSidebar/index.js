import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './styles.css';

class Sidebar extends Component {
    render() {
        const { history, location } = this.props
        const path = location.pathname
        return (
            <div className="sidebarWrapper">
                <div className={`sidebarIcon ${/home/.test(path) ? 'active' : ''}`} onClick={this.navigate('home')}>
                    <i className="fas fa-2x fa-home"></i> <br />
                    Leki
                </div>
                <div className={`sidebarIcon ${/leki/.test(path) ? 'active' : ''}`} onClick={this.navigate('leki')}>
                    <i className="fas fa-2x fa-pills"></i> <br />
                    Leki
                </div>
                <div className={`sidebarIcon ${/badania/.test(path) ? 'active' : ''}`} onClick={this.navigate('badania')}>
                    <i className="far fa-2x fa-clipboard"></i> <br/>
                    Badania
                </div>
            </div>
        )
    }
    navigate = name => () => {
        const uid = localStorage.getItem('uid')        
        this.props.history.push(uid ? `/${name}` : '/')
    }
}
export default withRouter(Sidebar)
