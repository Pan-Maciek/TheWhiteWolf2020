import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './styles.css';

class Sidebar extends Component {
    render() {
        const { history, location } = this.props
        const path = location.pathname
        return (
            <div className="sidebarWrapper">
                <div className={`sidebarIcon ${/user/.test(path) ? 'active' : ''}`} onClick={() => history.push('')}>
                    <i className="fas fa-2x fa-user-injured"></i> <br />
                    Pacjent
                </div>
                <div className="sidebarIcon" onClick={() => history.push('')}>
                    <i className="fas fa-2x fa-pills"></i> <br />
                    Leki
                </div>
                <div className="sidebarIcon" onClick={() => history.push('')}>
                    <i className="far fa-2x fa-clipboard"></i> <br/>
                    Badania
                </div>
            </div>
        )
    }
}
export default withRouter(Sidebar)
