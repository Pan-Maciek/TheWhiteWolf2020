import React, {Component} from 'react';
import './index.css';
import Medicine from "../medicineList";
import Examination from "../examination";

export default class ExaminationHistory extends Component {

    render() {
        const history = [
            {
                description: "Echo od kardiologa",
                date: "28-12-2019",
                details: "sciezka.pdf"
            },
            {
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing el" +
                    "it, sed do eiusmod tempor incididunt ut labore et dolore magna a" +
                    "liqua. Ut enim ad minim veniam, quis nostrud exercitation ullam" +
                    "co laboris nisi ut aliquip ex ea commodo consequat. Duis aute " +
                    "irure dolor in reprehenderit in voluptate velit esse cillum dolo" +
                    "re eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat n" +
                    "on proident, sunt in culpa qui officia deserunt mollit anim id e" +
                    "st laborum.",
                date: "19-10-2019",
                details: "sciezka.pdf"
            },
            {
                description: "Badanie wzroku u okulisty",
                date: "09-06-2019",
                details: "sciezka.pdf"
            },
            {
                description: "Prześwietlenie klatki piersiowej",
                date: "24-08-2018",
                details: "sciezka.pdf"
            }
        ];

        return (
            <div className="examHistoryContainer">
                <label className="examHistoryLabel">Historia badań pacjenta</label>
                <div className="examHistoryHeader">
                    <div className="examDescription">Opis</div>
                    <div className="examDate">Data</div>
                    <div className="examPdfIcon">Pdf</div>
                </div>
                {history.map((examination, key) => {
                    return <Examination key={key} obj = {examination}/>
                })}
            </div>
        )
    }
}