import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChickenHouse from './ChickenHouse';

const styles = {
  outerContainer: {
      marginTop: '20px',
  }  
};

export default class FarmView extends Component {
    constructor(props) {
        super(props);

        this.farmSize = 4;
        
        let chickenHouses = [];

        for(let row = 0; row < this.farmSize; row++ ) {
            let row = []
            for(let col = 0; col < this.farmSize; col++) {
                row.push('empty');
            }
            chickenHouses.push(row);
        }     

        this.state = {
            chickenHouses: chickenHouses,
        };   
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickenHouses.map((item, index) => (
                    <div class="row">
                        {item.map((company, index) => <div class="col"><ChickenHouse /></div>)}
                    </div>
                ))}
            </div>
        );
    }
}

if (document.getElementById('farmView')) {
    ReactDOM.render(<FarmView />, document.getElementById('farmView'));
}
