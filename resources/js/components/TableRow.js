import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    outerContainer: {
    },
    header: {
    },
    row: {
    }

};

export default class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        return (
            <div class={'row stripes hoverable'} style={styles.outerContainer}>
                
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
