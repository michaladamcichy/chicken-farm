import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  outerContainer: {    
  }  
};

export default class FarmView extends Component {
    render() {
        return (
            <div>
                <h1> KÓRNIKI </h1>
            </div>
        );
    }
}

if (document.getElementById('farmView')) {
    ReactDOM.render(<FarmView />, document.getElementById('farmView'));
}
