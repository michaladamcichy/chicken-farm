import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    outerContainer: {
        // overflow: 'auto',
        // whiteSpace: 'nowrap',
        //width: '200px', //ALERT TODO sprawdzać dokladna dlugosc
    },
    header: {
    },

};

export default class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        return (
            <div class={'row'} style={styles.outerContainer}>
                {this.props.cells.map(cell => {
                    return <div class={'col'}>
                        {cell}
                    </div>
                })}
            </div>
        );
    }
}

if (document.getElementById('tableRow')) {
    ReactDOM.render(<TableRow />, document.getElementById('tableRow'));
}
