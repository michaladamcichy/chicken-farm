import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        const styles =  {
            outerContainer: {
                overflow: 'auto',
                whiteSpace: 'nowrap',
                height: this.props.parentHeight,
            },
            header: {
                fontWeight: 'bold'
            },
        };
        
        return (
            <div class={'container'} style={styles.outerContainer}>
                <div class={'row'} style={styles.header}>
                    {this.props.columns.map(column => {
                    return <div class={'col'} >{column}</div>
                    })}
                </div>
                {this.props.rows.map((row, index) => Object.values(row)).map((array, index) => {return <TableRow onClick={() => this.props.onItemSelected(this.props.rows[index])} cells={array} />;})}
            </div>
        );
    }
}

if (document.getElementById('table')) {
    ReactDOM.render(<Table />, document.getElementById('table'));
}
