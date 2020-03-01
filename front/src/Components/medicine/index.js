import React, {Component} from 'react';
import './index.css';

export default class Medicine extends Component {

    render() {
        const {name,dose,from,to} = this.props.obj || {};

        return (
            <div className="medicineContainer">
                <div className="medicineName">{name}</div>
                <div className="douse">{dose}</div>
                <div className="from">{from}</div>
                <div className="to">{to}</div>
            </div>
        )
    }
}
