import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    outerContainer: {
        
    },
    image: {
        height: 40,
    },
};

export default class AddButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        return (
            <div style={styles.outerContainer}>
                <button class={'btn btn-light'} style={styles.button}><img src={'/images/addButton.png'} style={styles.image} /> </button>
            </div>
        );
    }
}

if (document.getElementById('addButton')) {
    ReactDOM.render(<AddButton />, document.getElementById('addButton'));
}
