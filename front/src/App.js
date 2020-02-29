import React from 'react';
import './App.css';
import MedicineList from './Components/medicineList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from "./Components/topbar";
import Sidebar from "./Components/sidebar";

function App() {
  return (
    <div className="App">
      <Topbar/>
        <MedicineList/>
    </div>
  );
}

export default App;
