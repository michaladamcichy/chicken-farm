import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChickenHouse from './ChickenHouse';
import NewChickenHouseDialog from './NewChickenHouseDialog';
import WorkersDialog from './WorkersDialog';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import { arrayToMatrix, matrixToArray } from './utils';
import axios from 'axios';

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
            workersDialogVisible: false,
            messages: [],
        };   
    }

    newChickenHouse() {
        this.setState({newChickenHouseDialogVisible: true, messages: []});
    }

    workers() {
        this.setState({workersDialogVisible: true, messages: []});
    }

    addChickenHouse(size) {
        let data = {size: size};
        axios.post('/addChickenhouse', data).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                if(response.messages) {
                    this.setState({messages: Object.values(response.messages).flat()});
                }
            } else {
                let chickenhouse = response;
                let chickenHouses = matrixToArray(this.state.chickenHouses);
                chickenHouses.push(chickenhouse);
                this.setState({chickenHouses: arrayToMatrix(chickenHouses, this.farmSize),newChickenHouseDialogVisible: false, messages: []});
            }
        }); 
    }

    feedAll() {
        axios.get('/feedAll').then(response => {
            response = response.data;
            
            if(response.status && response.status == 'error') {
                alert('Wielkie karmienie zakończone niepowodzeniem');
            }
        });
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
                    <SideButton title={'KADRA'} onClick={() => this.workers()}/>
                    <SideButton title={'WIELKIE\nKARMIENIE'} onClick={() => this.feedAll()}/>
                </SideBarContainer>
                {this.state.newChickenHouseDialogVisible && 
                <NewChickenHouseDialog
                    messages={this.state.messages}
                    switchVisibility={() => {this.setState({newChickenHouseDialogVisible : !this.state.newChickenHouseDialogVisible, messages: []})}}
                    onSubmit={size => this.addChickenHouse(size)}/>}
                {this.state.workersDialogVisible &&
                <WorkersDialog
                    messages={this.state.messages}
                    switchVisibility={() => {this.setState({workersDialogVisible : !this.state.workersDialogVisible, messages: []})}}
                    onSubmit={size => this.workers()}/>}
            </div>
        );
    }
}

if (document.getElementById('farmView')) {
    let element = document.getElementById('farmView');
    let chickenHouses = element.getAttribute('chickenHouses');
    ReactDOM.render(<FarmView chickenHouses={JSON.parse(chickenHouses)}/>, element);
}
