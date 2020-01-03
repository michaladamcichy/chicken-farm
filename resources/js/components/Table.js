import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';

const styles = {
    outerContainer: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        //maxWidth: '2000px', //ALERT TODO sprawdzać dokladna dlugosc
    },
    header: {
    },

};

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.columns = ['ID', 'Data', 'Godzina', 'Klient', 'Kwota', 'X', 'Y'];
        let row = ['A', 'B', 'C', 'D', 'E', 'X', 'Y'];

        this.rows = [];
        
        for(let i=0; i < 20; i++) {
            this.rows.push(row);
        }
      }

    render() {
        return (
            <div class={'container'} style={styles.outerContainer}>
                <div class={'row'} style={styles.header}>
                    {this.columns.map(column => {
                    return <div class={'col'} >{column}</div>
                    })}
                </div>
                {this.rows.map(row => {return <TableRow cells={row} />;})}
            </div>
        );
    }
}

if (document.getElementById('table')) {
    ReactDOM.render(<Table />, document.getElementById('table'));
}
