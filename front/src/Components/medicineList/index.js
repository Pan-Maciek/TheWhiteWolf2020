import React, {Component} from 'react';
import './index.css';
import Medicine from '../medicine';
import axios from 'axios'


export default class MedicineList extends Component {



    constructor(props) {
        super(props);
        this.state = {
            name: null,
            dose: null,
            from: null,
            to: null,
            currentMedicine: [],
            pastMedicine: []
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
        const newMedicine = {
            "name": this.state.name,
            "dose": this.state.dose,
            "from": this.getUnixTime(this.state.from),
            "to": this.getUnixTime(this.state.to)};

        axios.post(`/api/prescribe/${localStorage.getItem("uid")}`, {newMedicine})
            .then(res => {
            })

    }

    parseMedicine(res) {
        let resultCurrent = [];
        let resultPast = [];
        res.forEach((ele) => {
            if(ele.to < this.getUnixTime(Date.now()))
                resultPast.push({name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString()});
            else
                resultCurrent.push({name: ele.name, dose: ele.dose, from: new Date(ele.from * 1000).toLocaleDateString(), to: new Date(ele.to * 1000).toLocaleDateString()});
        });
        return {"current": resultCurrent, "past": resultPast};
    }

    getUnixTime(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    handleNameChange = (event) => {
        event.preventDefault();
        this.setState({name: event.target.value});
        this.checkForFormFilledIn();
    };
    handleDoseChange = (event) => {
        event.preventDefault();
        this.setState({dose: event.target.value});
        this.checkForFormFilledIn();
    };
    handleFromChange = (event) => {
        event.preventDefault();
        this.setState({from: event.target.value});
        this.checkForFormFilledIn();
    };
    handleToChange = (event) => {
        event.preventDefault();
        this.setState({to: event.target.value});
        this.checkForFormFilledIn();
    };
    checkForFormFilledIn() {
        if(this.state.name != null && this.state.dose != null && this.state.from != null && this.state.to != null) {
            document.getElementById("addMedicineSubmit").style.display = "block";
        }
    }

    getData() {
        axios.get(`/api/get_medicine/${localStorage.getItem("uid")}`)
            .then(res => {
                this.setState({currentMedicine: this.parseMedicine(res.data).current, pastMedicine: this.parseMedicine(res.data).past});
            });
    }

    componentWillMount() {
        this.getData();
    }

    render(){

        return (
            <div className="medicineListDiv">

                <label className="medicineLabel">Leki zażywane aktualnie</label>
                <div className="listHeader">
                    <div className="medicineName">Lek</div>
                    <div className="douse">Dawka(dzienna)</div>
                    <div className="from">Od</div>
                    <div className="to">Do</div>
                </div>

                <form className="newMedicineForm" onSubmit={this.handleSubmit}>
                    <input className="medicineName" placeholder="Nazwa leku" onChange={this.handleNameChange}/>
                    <input className="douse" type="number" placeholder="Dawka(dzienna)" onChange={this.handleDoseChange}/>
                    <input className="from " type="date" placeholder="Od" onChange={this.handleFromChange}/>
                    <input className="to" type="date" placeholder="Do" onChange={this.handleToChange}/>
                    <input id="addMedicineSubmit" type="submit" placeholder="+"/>
                </form>
                <div className="someMedicine">
                    {this.state.currentMedicine.map((medicine, key) => {
                        return <Medicine key={key} obj = {medicine}/>
                    })}
                </div>



                <br/>
                <label className="medicineLabel">Leki zażywane dawniej</label>

                <div className="listHeader">
                    <div className="medicineName">Lek</div>
                    <div className="douse">Dawka(dzienna)</div>
                    <div className="from">Od</div>
                    <div className="to">Do</div>
                </div>
                <div className="someMedicine">
                    {this.state.pastMedicine.map((medicine, key) => {
                        return <Medicine key={key} obj = {medicine}/>
                    })}
                </div>

            </div>
        )
    }


}
