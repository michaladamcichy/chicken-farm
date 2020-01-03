import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chicken from './Chicken';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import NewChickenDialog from './NewChickenDialog';
import FeedingDialog from './FeedingDialog';
import ChangeDutyDialog from './ChangeDutyDialog';
import ChickenInfoDialog from './ChickenInfoDialog';
import {arrayToMatrix} from './utils';


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

        this.state = {
            chickens: arrayToMatrix(chickensArray, this.chickenHouseSize),
            newChickenDialogVisible: false,
            feedingDialogVisible: false,
            changeDutyDialogVisible: false,
            chickenInfoDialogVisible: false,
            selectedChicken: null,
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

    chickenInfo(chicken) {
        this.setState({chickenInfoDialogVisible: true, selectedChicken : chicken});
    }
    
    render() {
        return (
            <div class="container" style={styles.outerContainer}>
                { this.state.chickens.map((item, column) => (
                    <div class="row">
                        {item.map((chicken, row) => <div class="col"><Chicken id={String(chicken.id)} onClick={() => this.chickenInfo(chicken)} /></div>)}
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
                <ChickenInfoDialog switchVisibility={() => this.setState({chickenInfoDialogVisible: !this.state.chickenInfoDialogVisible})}
                    chicken={this.state.selectedChicken}/>}
            </div>
        );
    }
}

if (document.getElementById('chickenHouseView')) {
    const element = document.getElementById('chickenHouseView');
    let chickens = element.getAttribute('chickens');
    ReactDOM.render(<ChickenHouseView chickens={JSON.parse(chickens)}/>, element);
}
