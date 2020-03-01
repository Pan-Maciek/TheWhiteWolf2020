import React from 'react';
import './App.css';
import Topbar from './components/topbar';
import Sidebar from './components/sidebar';
import MainPatientScreen from './components/mainPatientScreen'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExaminationHistory from "./components/examinationHistory";
import MedicineList from "./components/medicineList";


const publicVapidKey =
'BHF3G5cqLOzPnFaOCekYqUu7EUy9o0XyUSiQKhUyvfjv3T1M_x-0xMJgHFnbhEIOfZ3ysZpQQZOhSJee_9NdzIo';

//register service worker, register push, send push
async function send(uid) {
    //register service worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('Service worker registered...');

    //register push
    console.log('registering push...');
    
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Push registered...');

    //send push notification
    console.log('Sending push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify({ subscription, uid }),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function App(props) {
    send(props.uid)
    localStorage.setItem('uid', props.uid)
    return (
      <>
        <Router>
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
  