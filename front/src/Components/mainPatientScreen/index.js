import React from 'react'
import './index.css'


export default class MainPatientScreen extends React.Component {
    render() {
        const { name, surname, PESEL } = this.props.patient
        return (
        <>
            <div className="PatientDetails">
                <h3>Dane Pacjenta</h3>
                <p>Imię i nazwisko: {name + ' ' + surname}</p>
                <p>Wiek: {this.ageFromPESEL(PESEL)}</p>
                <p>Data urodzenia: {this.DOBfromPESEL(PESEL)}</p>
                <p>PESEL: {PESEL}</p>
            </div>
            <div className="Drugs">
            <h3>Leki Pacjenta</h3>
            </div>
            <div className="LastVisits">
            <h3>Ostatnie wizyty Pacjenta</h3>
            </div>
        </>
        )
    }

    ageFromPESEL(PESEL) {
        var currentYear = new Date().getFullYear()
        var yearOfBirth = this.DOBfromPESEL(PESEL).substr(6,4)
        currentYear = currentYear - parseInt(yearOfBirth)
        return currentYear
    }

    DOBfromPESEL(PESEL) {
        var year = PESEL.substring(0, 2)
        var month = parseInt(PESEL.substring(2, 4))
        var day = PESEL.substring(4, 6)
        //Solution with people born after 2000
        switch (true) { 
            case month > 20:
                year = "20" + year
                break
            default:
                year = "19" + year
        }
        if (month > 20) month -= 20
        return day + '.' + month + '.' + year + 'r.'
    }

}
