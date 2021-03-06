import React from 'react';
import './App.css';
import Topbar from './components/topbar';
import Sidebar from './components/sidebar';
import MainPatientScreen from './components/mainPatientScreen'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExaminationHistory from "./components/examinationHistory";
import MedicineList from "./components/medicineList";

function App() {

  return (
    <>
      <Router>
        <Topbar />
        
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            <Switch>
              <Route path="/pacjent">
                <MainPatientScreen patient={ { name: 'Mati', surname: 'Obrzut', PESEL: '80110185932' }} />
              </Route>
              <Route path="/leki">

                <MedicineList/>
              </Route>
              <Route path="/badania">
                <ExaminationHistory/>

              </Route>
              <Route path="/">
                <h1>
                  Proszę wybać pacjenta
                </h1>
              </Route>

            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
