import React, {Component} from 'react';
import './index.css';
import Examination from "../examination";
import axios from "axios";

export default class ExaminationHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history:[]
        };

    }


    getData() {
        axios.get(`/api/checkups/${localStorage.getItem("uid")}`)
            .then(res => {
                let hist =[];
                res.data.forEach((ele) => {
                    hist.push({description: ele.description, date: new Date(ele.date * 1000).toLocaleDateString(), details: ele.details});
                });
                this.setState({history: hist});
            });
    }



    componentWillMount() {
        this.getData();
    }

    render() {

        return (
            <div className="examHistoryContainer">
                <label className="examHistoryLabel">Historia badań pacjenta</label>
                <div className="historyContainer">
                    <table>
                        <tr>
                            <th className="examDescription">Opis</th>
                            <th className="examDate">Data</th>
                            <th className="examPdfIcon">Pdf</th>
                        </tr>
                        {this.state.history.map((examination, key) => {
                            return <Examination key={key} obj = {examination}/>
                        })}
                    </table>
                </div>

            </div>
        )
    }
}
