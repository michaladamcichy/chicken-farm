import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    outerContainer: {
        backgroundColor: 'red',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    chickenIcon: {
        height: '70px',
    }
};

export default class TopBar extends Component {
    render() {
        return (
            <div class="navbar" style={styles.outerContainer}>
                <a href="/"><button type="button" class="btn btn-warning">
                    <h1> KURCZAKI </h1>
                </button></a>
                <span class="navbar-brand">
                    <img src={'/images/chicken_head.png'} style={styles.chickenIcon} />
                    <img src={'/images/chicken_head.png'} style={styles.chickenIcon} />
                    <img src={'/images/chicken_head.png'} style={styles.chickenIcon} />
                </span>
            </div>
        );
    }
}

if (document.getElementById('topBar')) {
    ReactDOM.render(<TopBar />, document.getElementById('topBar'));
}
