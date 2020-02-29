import React, {Component} from 'react';
import './index.css';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Examination extends Component {


    render() {
        const {description,date,details} = this.props.obj || {};

        return (
            <div className="examinationContainer">
                <div className="examDescription">{description}</div>
                <div className="examDate">{date}</div>
                <div className="examPdfIcon"><FontAwesomeIcon icon={faFilePdf} size="2x" style={{color: 'green'}} /></div>
            </div>
        )
    }


}
