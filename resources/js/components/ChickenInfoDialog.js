import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {isEqual} from 'lodash';
import axios from 'axios';

const styles = {
}

export default class ChickenInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state={
            editable: false,
            editButtonText: 'Edytuj dane',
            chicken: Object.assign({}, this.props.chicken),
            chickenhousesIds: [],
            moveChickenButtonText: 'Przenieś',
            moveChickenSelectVisible: false,
            targetChickenhouseId: '',
        };
    }

    componentDidMount() {
        this.getChickenhouses();
    }

    getChickenhouses() {
        axios.get('/getChickenhousesIds').then(response => {
            let chickenhousesIds = response.data;
            chickenhousesIds.unshift('');
            chickenhousesIds.splice(chickenhousesIds.indexOf(this.state.chicken.chickenhouse_id), 1);

            this.setState({chickenhousesIds});
        });
    }

    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane', chicken: Object.assign({}, this.props.chicken)});
        } else {
            this.setState({editable: true, editButtonText: 'Anuluj edytowanie'});
        }
    }

    onKillButtonClicked() {
        this.props.onChickenKilled(this.props.chicken.id);
    }

    setType(value) {
        let chicken = this.state.chicken;
        chicken.type = value;
        this.setState({chicken});
    }

    setBirthdate(value) {
        let chicken = this.state.chicken;
        chicken.birthdate = value;
        this.setState({chicken});
    }

    setWeight(value) {
        let chicken = this.state.chicken;
        chicken.weight = value;
        this.setState({chicken});
    }

    onSubmit() {
        if (isEqual(this.state.chicken, this.props.chicken) == false) {
            this.props.onChickenUpdated(this.state.chicken);
        }
    }

    onMoveChickenButtonPressed() {
        if(this.state.moveChickenSelectVisible == false) {
            this.setState({moveChickenSelectVisible: true, moveChickenButtonText: 'Anuluj'});
        } else {
            this.setState({moveChickenSelectVisible: false, moveChickenButtonText: 'Przenieś'});
        }
    }

    moveChicken() {
        if(this.state.targetChickenhouseId != '') {
            this.onMoveChickenButtonPressed();

            let data={chickenId: this.state.chicken.id, targetChickenhouseId: this.state.targetChickenhouseId};

            axios.post('/moveChicken', data).then(response => {
                response = response.data;
                
                if(response.status == 'success') {
                    console.log('success!');
                    this.props.onChickenMoved(this.state.chicken.id);
                } else {
                    console.log('error');
                }
            });
        }
    }

    render() {
        return (
            <DialogContainer
                title={'Kurczak #' + String(this.state.chicken.id)}
                switchVisibility={() => this.props.switchVisibility()}
                onSubmit={() => this.onSubmit()}>
                <fieldset disabled={!this.state.editable}>
                    <FormRow fieldName={'Rodzaj kurczaka'} input={<select onChange={event => { this.setType(event.target.value) }} value={this.state.chicken.type}>
                            <option value={'layer'}>Nioska</option>
                            <option value={'meatchicken'}>Mięsna</option>
                            <option value={'rooster'}>Kogut</option>
                        </select>}/>
                    <FormRow fieldName={'Data urodzenia'} input={<input type={'date'} onChange={event => this.setBirthdate(event.target.value)} value={this.state.chicken.birthdate}></input>} />
                    <FormRow fieldName={'Masa [kg]'} input={<input type={'number'} onChange={event => this.setWeight(event.target.value)} min={0.0} value={this.state.chicken.weight} step={0.01}  ></input>} />
                </fieldset>
                <div class={'container row formRow'}>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-warning'} onClick={() => this.onEditButtonClicked()}>{this.state.editButtonText}</button>
                    </div>
                </div>
                <hr />
                <div class={'container row formRow'}>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-warning'} onClick={() => this.onMoveChickenButtonPressed()}>
                            {this.state.moveChickenButtonText}
                        </button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-success'}>{'Jajko!'}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-danger'} onClick={() => this.onKillButtonClicked()}>{'Zabij'}</button>
                    </div>
                </div>
                <div class={'container row formRow'}>
                    {this.state.moveChickenSelectVisible &&
                    <div class={'container col'}>
                        <select value={this.state.targetChickenhouseId} onChange={event => this.setState({targetChickenhouseId: event.target.value})}>
                            {this.state.chickenhousesIds.map(id => {
                            return <option value={id}>{id == '' ? '' : '#' + id} </option>})}</select>
                    </div>}
                    {this.state.moveChickenSelectVisible &&
                    <div class={'container'}>
                        <button onClick={() => {this.moveChicken()}} type={'button'} class={'btn btn-success'}>
                            {'Przenieś!'}
                        </button>
                    </div>}
                </div>
                <hr />
            </DialogContainer>
        );
    }
}

if (document.getElementById('chickenInfoDialog')) {
    ReactDOM.render(<ChickenInfoDialog />, document.getElementById('chickenInfoDialog'));
}
