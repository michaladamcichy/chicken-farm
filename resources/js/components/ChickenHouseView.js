import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chicken from './Chicken';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import NewChickenDialog from './NewChickenDialog';
import EditChickenHouseDialog from './EditChickenHouseDialog';
import FeedingDialog from './FeedingDialog';
import ChangeDutyDialog from './ChangeDutyDialog';
import ChickenInfoDialog from './ChickenInfoDialog';
import {arrayToMatrix, matrixToArray} from './utils';
import axios from 'axios';

const styles = {
  outerContainer: {
      marginTop: '20px',
      border: '30px dashed rgb(82,37,0)',
  },
  chickenIcon: {
    height: '70px',
}  
};

export default class ChickenHouseView extends Component {
    constructor(props) {
        super(props);

        this.chickenHouseSize = 4; 
        let chickensArray = this.props.chickens;
        let chickens = arrayToMatrix(chickensArray, this.chickenHouseSize);

        this.audio = new Audio('/audio/song.mp3');

        this.state = {
            id: this.props.chickenhouseId,
            size: this.props.chickenhouseSize, 
            chickens: arrayToMatrix(chickensArray, this.chickenHouseSize),
            newChickenDialogVisible: false,
            feedingDialogVisible: false,
            changeDutyDialogVisible: false,
            chickenInfoDialogVisible: false,
            editChickenHouseDialogVisible: false,
            selectedChicken: null,
            dancing: false,
        };   

        console.log('ChickenHouseView' + String(this.props.chickenhouseId));
    }

    newChicken() {
        this.setState({newChickenDialogVisible: true});
    }

    feeding() {
        this.setState({feedingDialogVisible: true});
    }

    changeDuty() {
        this.setState({changeDutyDialogVisible: true});
    }

    chickenInfo(chicken) {
        this.setState({chickenInfoDialogVisible: true, selectedChicken : chicken});
    }

    editChickenHouse() {
        this.setState({editChickenHouseDialogVisible: true});    
    }

    onChickenKilled(id) {
        axios.delete('/killChicken/' + String(id)).then(response => {
            response = response.data;
            if(response.status == 'success') {
                let chickens = this.state.chickens;
                chickens = matrixToArray(chickens);
                chickens = chickens.filter(item => item.id != response.id);
                chickens = arrayToMatrix(chickens, this.chickenHouseSize);
                this.setState({chickens, chickenInfoDialogVisible: false});
            }
        });
    }

    onChickenUpdated(chicken) {
        axios.post('/updateChicken', chicken).then(response => {
            chicken = response.data;

            let chickens = matrixToArray(this.state.chickens);

            for(let i=0; i<chickens.length; i++) {
                if(chickens[i].id == chicken.id) {
                    chickens[i] = chicken;
                    this.setState({chickens : arrayToMatrix(chickens, this.chickenHouseSize)});
                    break;
                }
            } 
        });
    }

    onChickenAdded(chicken) {
        axios.post('/addChicken', chicken).then(response => {
            response = response.data;

            if(typeof response.status != undefined && response.status == 'error') {
                console.log('nie udalo sie dodac kurczaka');
            } else {
                let chicken = response;
                let chickens = this.state.chickens;
                chickens = matrixToArray(chickens);
                chickens.push(chicken);
                chickens = arrayToMatrix(chickens, this.chickenHouseSize);
                this.setState({chickens});
            }
        });
    }

    onChickenHouseEdited(chickenhouse) {
        if(this.state.size != chickenhouse.size) {
            axios.post('/updateChickenhouse', chickenhouse).then(response => {
                let chickenhouse = response.data;
                this.setState({size: chickenhouse.size});
            });
        }
    }

    onChickenHouseDeleted() {
        axios.delete('/deleteChickenhouse/' + String(this.state.id)).then(response => {
            response = response.data;
            if(response.status == 'error') {
                console.log('Nie mozna usunac kornika, w ktorym sa kury!');
            } else {
                window.location.href='/';
            }
        });
    }

    onFeeding(feeding) {
        feeding.chickenhouse_id = this.state.id;
        axios.post('/feedChickens', feeding).then(response => {
            response = response.data;

            if(response.status == 'success') {
                console.log('SUCESS');
            } else {
                console.log('FAILED');
            }
        });
    }

    switchMusic() {
        if(this.state.dancing == false) {
            this.setState({dancing : true});
            this.audio.play();
        } else {
            this.setState({dancing : false});
            this.audio.pause();
        }
    }

    onChickenMoved(id) {
        let chickens = this.state.chickens;
        chickens = matrixToArray(chickens);
        chickens = chickens.filter(item => item.id != id);
        chickens = arrayToMatrix(chickens, this.chickenHouseSize);
        this.setState({chickens, chickenInfoDialogVisible: false,});
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickens.map((item, column) => (
                    <div class="row">
                        {item.map((chicken, row) => <div class="col"><Chicken id={String(chicken.id)} row={chicken.row} onClick={() => this.chickenInfo(chicken)} dancing={this.state.dancing} /></div>)}
                    </div>
                ))}
                <SideBarContainer>
                    <SideButton title={'DODAJ KURCZAKA'} onClick={() => this.newChicken()}/>
                    <SideButton title={'NAKARM KURCZAKI'} onClick={() => this.feeding()}/>
                    <SideButton title={'MUZYKA'} onClick={() => this.switchMusic()}/>
                    <SideButton title={'ZMIEŃ OSOBY ODP.'} onClick={() => this.changeDuty()}/>
                    <SideButton title={'HISTORIA KARMIENIA'}/>
                    <SideButton title={'USTAWIENIA KÓRNIKA'} onClick={() => this.editChickenHouse()}/>
                </SideBarContainer>
                {this.state.newChickenDialogVisible &&
                <NewChickenDialog onChickenAdded={chicken => this.onChickenAdded(chicken)} chickenhouseId={this.state.id} switchVisibility={() => this.setState({newChickenDialogVisible: !this.state.newChickenDialogVisible})} />}
                {this.state.feedingDialogVisible &&
                <FeedingDialog switchVisibility={() => this.setState({feedingDialogVisible: !this.state.feedingDialogVisible})}
                    onFeeding={feeding => this.onFeeding(feeding)}
                    chickenhouseId={this.state.id}/>}
                {this.state.changeDutyDialogVisible &&
                <ChangeDutyDialog chickenhouseId={this.state.id} switchVisibility={() => this.setState({changeDutyDialogVisible: !this.state.changeDutyDialogVisible})} />}
                {this.state.chickenInfoDialogVisible &&
                <ChickenInfoDialog switchVisibility={() => this.setState({chickenInfoDialogVisible: !this.state.chickenInfoDialogVisible})}
                    chicken={this.state.selectedChicken}
                    onChickenKilled={id => this.onChickenKilled(id)}
                    onChickenUpdated={chicken => this.onChickenUpdated(chicken)}
                    onChickenMoved={id => this.onChickenMoved(id)}/>}
                {this.state.editChickenHouseDialogVisible && 
                <EditChickenHouseDialog
                    chickenHouse={{id: this.state.id, size: this.state.size}}
                    switchVisibility={() => {this.setState({editChickenHouseDialogVisible : !this.state.editChickenHouseDialogVisible})}}
                    onSubmit={chickenhouse => this.onChickenHouseEdited(chickenhouse)}
                    onDelete={() => this.onChickenHouseDeleted()}
                    />}
            </div>
        );
    }
}

if (document.getElementById('chickenHouseView')) {
    const element = document.getElementById('chickenHouseView');
    let chickens = element.getAttribute('chickens');
    let id = element.getAttribute('chickenhouseid');
    let size = element.getAttribute('chickenhousesize');
    ReactDOM.render(<ChickenHouseView chickens={JSON.parse(chickens)} chickenhouseId={id} chickenhouseSize={size}/>, element);
}
