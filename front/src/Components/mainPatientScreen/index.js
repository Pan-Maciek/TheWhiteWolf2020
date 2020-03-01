import React from 'react'
import './index.css'
import axios from "axios";

export default class MainPatientScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            age: null,
            birthDate: null,
            pesel: null
        };
    }

    getData() {
        axios.get(`/api/get_all/${localStorage.getItem("uid")}`)
            .then(res => {
                this.setState({name: res.data[0].name, surname: res.data[0].surname, age: this.ageFromPESEL(res.data[0].pesel), birthDate: this.DOBfromPESEL(res.data[0].pesel), pesel: res.data[0].pesel});
            });
    }


    componentWillMount() {
        this.getData();
    }
    render() {
        return (
            <div style={{    marginTop: "30px", marginRight: '88px'}}>
                <div className="patientTableContainer">
                    <table style={{maxWidth:"657px"}}>
                        <tbody>
                            <tr>
                                <td>Imię</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Nazwisko</td>
                                <td>{this.state.surname}</td>
                            </tr>
                            <tr>
                                <td>Wiek</td>
                                <td>{this.state.age}</td>
                            </tr>
                            <tr>
                                <td>Data urodzenia</td>
                                <td>{this.state.birthDate}</td>
                            </tr>
                            <tr>
                                <td>PESEL</td>
                                <td>{this.state.pesel}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
