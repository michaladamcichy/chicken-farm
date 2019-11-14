import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    button: {
        width: '100px',
        height: '100px',
        margin: '50px',
        boxShadow: '10px 10px 5px grey',
    }
}

export default class ChickenHouse extends Component {
    render() {
        return (
            <div class="col">
                <a href={'/chickenHouse/0'}><button type="button" class="btn btn-warning" style={styles.button}> KÓRNIK </button></a>
            </div>
        );
    }
}

if (document.getElementById('chickenHouse')) {
    ReactDOM.render(<ChickenHouse />, document.getElementById('chickenHouse'));
}
