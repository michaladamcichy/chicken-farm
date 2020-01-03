import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChickenHouse from './ChickenHouse';
import NewChickenHouseDialog from './NewChickenHouseDialog';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import ArrayToMatrix, { arrayToMatrix } from './utils';

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

        this.state = {
            chickenHouses: arrayToMatrix(this.props.chickenHouses, this.farmSize),
            newChickenHouseDialogVisible: false,
        };   
    }

    newChickenHouse() {
        this.setState({newChickenHouseDialogVisible: true});
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickenHouses.map((item, col) => (
                    <div class="row">
                        {item.map((chickenHouse, row) => <div class="col"><ChickenHouse id={chickenHouse.id} /></div>)}
                    </div>
                ))}
                <SideBarContainer>
                    <SideButton title={'DODAJ KÓRNIK'} onClick={() => {this.newChickenHouse()}}/>
                    <SideButton title={'DODAJ KÓRNIK'} onClick={() => {this.newChickenHouse()}}/>
                    <SideButton title={'BIZNES'} onClick={() => {window.location.href='business'}}/>
                </SideBarContainer>
                {this.state.newChickenHouseDialogVisible && 
                <NewChickenHouseDialog switchVisibility={() => {this.setState({newChickenHouseDialogVisible : !this.state.newChickenHouseDialogVisible})}}/>}
            </div>
        );
    }
}

if (document.getElementById('farmView')) {
    let element = document.getElementById('farmView');
    let chickenHouses = element.getAttribute('chickenHouses');
    ReactDOM.render(<FarmView chickenHouses={JSON.parse(chickenHouses)}/>, element);
}
