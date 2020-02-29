import React from 'react';
import './App.css';
import Topbar from './components/topbar';
import Sidebar from './components/sidebar';
import MainPatientScreen from './components/mainPatientScreen'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <div>
          <Switch>
            <Route path="/user/:uid">
              <MainPatientScreen patient={{name:'Mati', surname:'Obrzut', PESEL: '80110185932'}} />
            </Route>
            <Route path="/">Home sweet home!</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
