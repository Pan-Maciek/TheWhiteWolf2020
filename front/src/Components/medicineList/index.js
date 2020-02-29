import React, {Component} from 'react';
import './index.css';
import Medicine from '../medicine';

export default class MedicineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            douse: null,
            from: null,
            to: null,
            errors: {
                name: '',
                douse: '',
                from: '',
                to: ''
            }
        };
    }



    render(){
            const currentMedicine = [
            {
                name: "Paracetamol",
                douse: 2,
                from: "24-12-2019",
                to: "06-01-2020"
            },
            {
                name: "Sinupret",
                douse: 1,
                from: "18-02-2020",
                to: "29-03-2020"
            },
            {
                name: "Witamina C",
                douse: 3,
                from: "25-02-2020",
                to: "15-03-2020"
            },
            {
                name: "Alcacet",
                douse: 1,
                from: "28-02-2020",
                to: "28-03-2020"
            }
        ];
            const pastMedicine = [
            {
                name: "Paracetamol",
                douse: 2,
                from: "24-12-2019",
                to: "06-01-2020"
            },
            {
                name: "Ibuprofen",
                douse: 2,
                from: "11-11-2019",
                to: "12-12-2019"
            },
            {
                name: "Maść na ból dupy",
                douse: 4,
                from: "01-01-2016",
                to: "31-12-2020"
            }
        ];

        return (
            <div className="medicineListDiv">

                <label className="medicineLabel">Aktualne leki</label>
                <div className="listHeader">
                    <div className="medicineName">Lek</div>
                    <div className="douse">Dawka(dzienna)</div>
                    <div className="from">Od</div>
                    <div className="to">Do</div>
                </div>

                <form className="newMedicineForm">
                    <input className="medicineName" placeholder="Nazwa leku"/>
                    <input className="douse" placeholder="Dawka(dzienna)"/>
                    <input className="from " placeholder="Od"/>
                    <input className="to" placeholder="Do"/>

                </form>
                {currentMedicine.map((medicine, key) => {
                    return <Medicine key={key} obj = {medicine}/>
                })}



                <br/>
                <label className="medicineLabel">Przedawnione leki</label>

                <div className="listHeader">
                    <div className="medicineName">Lek</div>
                    <div className="douse">Dawka(dzienna)</div>
                    <div className="from">Od</div>
                    <div className="to">Do</div>
                </div>

                {pastMedicine.map((medicine, key) => {
                    return <Medicine key={key} obj = {medicine}/>
                })}

            </div>
        )
    }


}
