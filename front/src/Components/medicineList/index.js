import React, { Component } from 'react';
import './index.css';
import Medicine from '../medicine';
import axios from 'axios'

import SuggestionInput from '../suggestionInput'

export default class MedicineList extends Component {



    constructor(props) {
        super(props);
        this.state = {
            name: '', dose: 0, from: 0, to: 0,
            currentMedicine: [],
            pastMedicine: [], warnings: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDoseChange = this.handleDoseChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const id = localStorage.getItem("uid");
        const data = {
            "name": this.state.name,
            "dose": this.state.dose,
            "from": this.getUnixTime(this.state.from),
            "to": this.getUnixTime(this.state.to)
        }
        axios.post(`/api/prescribe/${localStorage.getItem("uid")}`, data);
        this.setState({
            currentMedicine: [...this.state.currentMedicine, data],
            name: '',
            dose: 0,
            from: '',
            to: '',
            warnings: []
        })
    }


    parseMedicine(res) {
        let resultCurrent = [];
        let resultPast = [];
        res.forEach((ele) => {
            if (ele.to < this.getUnixTime(Date.now()))
                resultPast.push({ name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString() });
            else
                resultCurrent.push({ name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString() });
        });
        return { "current": resultCurrent, "past": resultPast };
    }

    getUnixTime(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    handleNameChange = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    };
    handleDoseChange = (event) => {
        event.preventDefault();
        this.setState({ dose: event.target.value });
    };
    handleFromChange = (event) => {
        event.preventDefault();
        this.setState({ from: event.target.value });
    };
    handleToChange = (event) => {
        event.preventDefault();
        this.setState({ to: event.target.value });
    };

    parseMedicine(res) {
        let resultCurrent = [];
        let resultPast = [];
        res.forEach((ele) => {
            if (ele.to < this.getUnixTime(Date.now()))
                resultPast.push({ name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString() });
            else
                resultCurrent.push({ name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString() });
        });
        return { "current": resultCurrent, "past": resultPast };
    }

    async getData() {
        const data = await axios.get(`/api/get_medicine/${localStorage.getItem("uid")}`).then(res => res.data)
        this.setState({ currentMedicine: this.parseMedicine(data).current, pastMedicine: this.parseMedicine(data).past })
    }

    async getWarnings() {
        const data = await axios({
            method: 'post',
            url: '/api/coliding',
            data: { drugs: this.state.currentMedicine.map(x => x.name) }
        }).then(res => res.data)
        this.setState({
            warnings: data.map(x => x.split('+').map(x => x.trim()))
                .reduce((acc, x) => [...acc, ...x], [])
        })
    }

    async componentWillMount() {
        await this.getData();
        await this.getWarnings();
    }

    render() {

        return (
            <div className="medicineListDiv">

                <h2>Leki zażywane aktualnie</h2>
                <div style={{}}>
                    <button onClick={this.handleSubmit} className="addNew1">+</button>
                    <div className="wrap1">
                        <table>
                            <thead>
                                <tr>
                                    <td>Lek</td>
                                    <td>Dawka</td>
                                    <td>Od</td>
                                    <td>Do</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <SuggestionInput completionUrl="/api/complete" placeholder="Nazwa leku" onChange={this.handleNameChange} value={this.state.name} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="Dawka(dzienna)" onChange={this.handleDoseChange} value={this.state.dose} />
                                    </td>
                                    <td>
                                        <input type="date" placeholder="Od" onChange={this.handleFromChange} value={this.state.from} />
                                    </td>
                                    <td>
                                        <input type="date" placeholder="Do" onChange={this.handleToChange} value={this.state.to} />
                                    </td>
                                </tr>
                                {[...this.state.currentMedicine].reverse().map((medicine, key) => <Medicine warnings={this.state.warnings} key={key} obj={medicine} />)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="someMedicine">
                </div>

                <h2>Leki zażywane dawniej</h2>
                <div className="wrap1">
                    <table>
                        <thead>
                            <tr>
                                <td>Lek</td>
                                <td>Dawka</td>
                                <td>Od</td>
                                <td>Do</td>
                            </tr>
                        </thead>
                        <tbody>
                            {[...this.state.pastMedicine].reverse().map((medicine, key) => <Medicine key={key} obj={medicine} />)}
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }


}
