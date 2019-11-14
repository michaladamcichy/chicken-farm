import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    button: {
        width: '100px',
        height: '100px',
        margin: '50px',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    chickenIcon: {
        height: '100px',
    }
}

export default class Chicken extends Component {
    render() {
        return (
            <div class="col">
                <div style={styles.button}> <img src={'/images/chicken.png'} style={styles.chickenIcon} /> </div>
            </div>
        );
    }
}

if (document.getElementById('chicken')) {
    ReactDOM.render(<Chicken />, document.getElementById('chicken'));
}
