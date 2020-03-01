import React from 'react'
import './index.css'
import moment from 'moment'

export default class PersonalPatientScreen extends React.Component {
    render() {
        const { drugs } = this.props.drugs
        let date = new Date()
        return (
            <>
                <div className="MojeLeki">
                    <h2>Moje leki na dziś: {moment().format('Do MMMM YYYY')}</h2>
                    <table className="DzienLekow">
                        <tr>
                            <th>Rano</th>
                            <th>Południe</th>
                            <th>Wieczór</th>
                        </tr>
                        <tr>
                            <td>Lek 1</td>
                            <td>Lek 1</td>
                            <td>Lek 1</td>
                        </tr>
                    </table>

                </div>
                <div>
                <h2>Historia leków</h2>
                    <div style={{ display: "flex" }}>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-6)
                            
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-5)
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-4)
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-3)
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-2)
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay}-1)
                </div>
                        <div className="dayPanel">
                        dayOfWeekName({new Date().getDay})
                </div>
                    </div>
                </div>
            </>
        )
    }
    
    dayOfWeekName(date){
        switch(date){
            case 0:
                return "Poniedziałek";
            case 1:
                return "Wtorek";
            case 2:
                return "Środa";
            case 3:
                return "Czwartek";
            case 4:
                return "Piątek";
            case 5:
                return "Sobota";
            case 6:
                return "Niedziela";
        }
    }
    
    dayMedicineIntake(day){
        
    }


}