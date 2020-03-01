import React from 'react'
import './index.css'
import moment from 'moment'

export default class PersonalPatientScreen extends React.Component {
    render() {
        const { drugs } = this.props.drugs || []
        let date = new Date()
        return (
            <>
                <div className="MojeLeki">
                    <table className="DzienLekow">
                        <tr>
                            <th>Rano</th>
                            <th>Południe</th>
                            <th>Wieczór</th>
                        </tr>
                        <tr>
                            <td>
                                <ul>
                                    <li>Paracetamol</li>
                                    <li>Paracetamol</li>
                                    <li>Paracetamol</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>Ibuprofen</li>
                                    <li>Ibuprofen</li>
                                    <li>Ibuprofen</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>Ibuprofen</li>
                                    <li>Ibuprofen</li>
                                    <li>Ibuprofen</li>
                                </ul>

                            </td>
                        </tr>
                    </table>


                        <div className="foo1">
                            <div className="foo2">
                                <p>Pon</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Wt</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Śr</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Czw</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Pt</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Sob</p>
                                <i class="fas fa-check"></i>
                            </div>
                            <div className="foo2">
                                <p>Nd</p>
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
            </>
        )
    }

    dayOfWeekName(date) {
        switch (date) {
            case 0:
                return "Pon";
            case 1:
                return "Wt";
            case 2:
                return "Śr";
            case 3:
                return "Czw";
            case 4:
                return "Pt";
            case 5:
                return "Sob";
            case 6:
                return "Nd";
        }
    }

    dayMedicineIntake(day) {

    }


}