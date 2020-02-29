import React, {Component} from 'react';
import './index.css';

export default class ContraindicationList extends Component {

    render() {
        const contraindications = [
            {description: "Alergia na migdały"},
            {description: "Alergia na miód"},
            {description: "Uczulenie na kocią sierść"}
        ];

        return (
            <ul className="contraindicationList">
                {contraindications.map(({description}) => {
                    return <li>{description}</li>;
                })}
            </ul>
        )
    }
}
