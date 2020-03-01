import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserApp from './UserApp';

let user = 'WfWuPDi3ss8QUdVq';
// let user = '';

ReactDOM.render(user ? <UserApp uid={user}/> : <App />, document.getElementById('root'));
