import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        let rows = this.props.rows.map(row => Object.values(row));
        
        this.state = {
            rows: rows,
        };
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
                {this.state.rows.map(row => {return <TableRow cells={row} />;})}
            </div>
        );
    }
}

if (document.getElementById('table')) {
    ReactDOM.render(<Table />, document.getElementById('table'));
}
