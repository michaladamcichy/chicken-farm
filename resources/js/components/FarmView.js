import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChickenHouse from './ChickenHouse';
import NewChickenHouseDialog from './NewChickenHouseDialog';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';

const styles = {
  outerContainer: {
      marginTop: '20px',
      border: '30px dashed rgb(82,37,0)',
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
            newChickenHouseDialogVisible: false,
        };   
    }

    newChickenHouse() {
        this.setState({newChickenHouseDialogVisible: true});
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickenHouses.map((item, index) => (
                    <div class="row">
                        {item.map((company, index) => <div class="col"><ChickenHouse /></div>)}
                    </div>
                ))}
                <SideBarContainer>
                    <SideButton title={'DODAJ KÓRNIK'} onClick={() => {this.newChickenHouse()}}/>
                    <SideButton title={'DODAJ KÓRNIK'} onClick={() => {this.newChickenHouse()}}/>
                </SideBarContainer>
                {this.state.newChickenHouseDialogVisible && 
                <NewChickenHouseDialog switchVisibility={() => {this.setState({newChickenHouseDialogVisible : !this.state.newChickenHouseDialogVisible})}}/>}
            </div>
        );
    }
}

if (document.getElementById('farmView')) {
    ReactDOM.render(<FarmView />, document.getElementById('farmView'));
}
