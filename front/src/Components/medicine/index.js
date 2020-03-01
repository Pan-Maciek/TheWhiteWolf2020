import React, { Component } from 'react';
import './index.css';

export default class Medicine extends Component {

    render() {
        const { name, dose, from, to } = this.props.obj || {};
        return (
            <tr className={this.props.warnings.some(x => x.startsWith(name)) ? 'warn' : ''}>
                <td>{name}</td>
                <td>{dose}</td>
                <td>{from}</td>
                <td>{to}</td>
            </tr>
        )
    }
}
