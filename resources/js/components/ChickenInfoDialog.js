import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {isEqual} from 'lodash';

const styles = {
}

export default class ChickenInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state={
            editable: false,
            editButtonText: 'Edytuj dane',
            chicken: Object.assign({}, this.props.chicken),
        };
    }

    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane', chicken: this.props.chicken});
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

    render() {
        return (
            <DialogContainer
                title={'Kurczak #' + String(this.state.chicken.id)}
                switchVisibility={() => this.props.switchVisibility()}
                saveButtonDisabled={!this.state.editable}
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
                        <button type={'button'} class={'btn btn-success'}>{'Jajko!'}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-danger'} onClick={() => this.onKillButtonClicked()}>{'Zabij'}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-warning'}>{'Przenieś'}</button>
                    </div>
                </div>
                <hr />
            </DialogContainer>
        );
    }
}

if (document.getElementById('chickenInfoDialog')) {
    ReactDOM.render(<ChickenInfoDialog />, document.getElementById('chickenInfoDialog'));
}
