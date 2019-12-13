import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chicken from './Chicken';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import NewChickenDialog from './NewChickenDialog';
import FeedingDialog from './FeedingDialog';
import ChangeDutyDialog from './ChangeDutyDialog';
import ChickenInfoDialog from './ChickenInfoDialog';

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
            newChickenDialogVisible: false,
            feedingDialogVisible: false,
            changeDutyDialogVisible: false,
            chickenInfoDialogVisible: false,
        };   
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

    chickenInfo() {
        this.setState({chickenInfoDialogVisible: true});
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickens.map((item, column) => (
                    <div class="row">
                        {item.map((company, row) => <div class="col"><Chicken id={String(column * item.length + row + 1)} onClick={() => this.chickenInfo()} /></div>)}
                    </div>
                ))}
                <SideBarContainer>
                    <SideButton title={'DODAJ KURCZAKA'} onClick={() => this.newChicken()}/>
                    <SideButton title={'NAKARM KURCZAKI'} onClick={() => this.feeding()}/>
                    <SideButton title={'MUZYKA'}/>
                    <SideButton title={'ZMIEŃ OSOBY ODP.'} onClick={() => this.changeDuty()}/>
                    <SideButton title={'HISTORIA KARMIENIA'}/>
                </SideBarContainer>
                {this.state.newChickenDialogVisible &&
                <NewChickenDialog switchVisibility={() => this.setState({newChickenDialogVisible: !this.state.newChickenDialogVisible})} />}
                {this.state.feedingDialogVisible &&
                <FeedingDialog switchVisibility={() => this.setState({feedingDialogVisible: !this.state.feedingDialogVisible})} />}
                {this.state.changeDutyDialogVisible &&
                <ChangeDutyDialog switchVisibility={() => this.setState({changeDutyDialogVisible: !this.state.changeDutyDialogVisible})} />}
                {this.state.chickenInfoDialogVisible &&
                <ChickenInfoDialog switchVisibility={() => this.setState({chickenInfoDialogVisible: !this.state.chickenInfoDialogVisible})}/>}
            </div>
        );
    }
}

if (document.getElementById('chickenHouseView')) {
    ReactDOM.render(<ChickenHouseView />, document.getElementById('chickenHouseView'));
}
