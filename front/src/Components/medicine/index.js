import React, {Component} from 'react';
import './index.css';

export default class Medicine extends Component {

    render() {
        const {name,douse,from,to} = this.props.obj || {};

        return (
            <div className="medicineContainer">
                <div className="medicineName">{name}</div>
                <div className="douse">{douse}</div>
                <div className="from">{from}</div>
                <div className="to">{to}</div>
            </div>
        )
    }
}
