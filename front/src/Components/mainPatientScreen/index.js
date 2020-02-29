import React from 'react'
import './index.css'

export default class MainPatientScreen extends React.Component {
    render() {
        const { name, surname, PESEL } = this.props.patient
        return (
            <div style={{ marginRight: '88px' }}>
                <table>
                    <tbody>
                        <tr>
                            <td>Imię</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Nazwisko</td>
                            <td>{surname}</td>
                        </tr>
                        <tr>
                            <td>Wiek</td>
                            <td>{this.ageFromPESEL(PESEL)}</td>
                        </tr>
                        <tr>
                            <td>Data urodzenia</td>
                            <td>{this.DOBfromPESEL(PESEL)}</td>
                        </tr>
                        <tr>
                            <td>PESEL</td>
                            <td>{PESEL}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    ageFromPESEL(PESEL) {
        var currentYear = new Date().getFullYear()
        var yearOfBirth = this.DOBfromPESEL(PESEL).substr(6, 4)
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
        return `${day}.${month}.${year}r.`
    }
}