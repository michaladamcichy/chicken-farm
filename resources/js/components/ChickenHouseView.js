import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chicken from './Chicken';

const styles = {
  outerContainer: {
      marginTop: '20px',
  },
  chickenIcon: {
    height: '70px',
}  
};

export default class ChickenHouseView extends Component {
    constructor(props) {
        super(props);

        this.chickenHouseSize = 4;
        
        let chickens = [];

        for(let row = 0; row < this.chickenHouseSize; row++ ) {
            let row = [];
            for(let col = 0; col < this.chickenHouseSize; col++) {
                row.push('empty');
            }
            chickens.push(row);
        }     

        this.state = {
            chickens: chickens,
        };   
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickens.map((item, index) => (
                    <div class="row">
                        {item.map((company, index) => <div class="col"><Chicken /></div>)}
                    </div>
                ))}
            </div>
        );
    }
}

if (document.getElementById('chickenHouseView')) {
    ReactDOM.render(<ChickenHouseView />, document.getElementById('chickenHouseView'));
}
