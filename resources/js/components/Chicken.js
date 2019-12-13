import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    button: {
        width: '100px',
        height: '100px',
        margin: '50px',
        backgroundColor: 'rgba(0,0,0,0)',
        border: '10px dashed rgba(0,0,0,0)',
    },
    chickenIcon: {
        height: '80px',
    },
    chickenId: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textShadow: '0px 0px 5px yellow',
    }
}

export default class Chicken extends Component {
    render() {
        return (
            <div class="col">
                <button onClick={() => this.props.onClick()} class="chicken" style={styles.button}>
                    <img src={'/images/chicken.png'} style={styles.chickenIcon} />
                    <h2 style={styles.chickenId}>{this.props.id ? '#' + this.props.id : ''}</h2>
                </button>
            </div>
        );
    }
}

if (document.getElementById('chicken')) {
    ReactDOM.render(<Chicken />, document.getElementById('chicken'));
}
