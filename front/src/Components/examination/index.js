import React, { Component } from 'react';
import './index.css';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Examination extends Component {


    render() {
        const { description, date, details } = this.props.obj || {};

        return (
            <tr className="examinationContainer">
                <td className="examDescription">{description}</td>
                <td className="examDate">{date}</td>
                <td className="examPdfIcon"><FontAwesomeIcon icon={faFilePdf} size="2x" style={{ color: '#cc3f3f' }} /></td>
            </tr>
        )
    }


}
