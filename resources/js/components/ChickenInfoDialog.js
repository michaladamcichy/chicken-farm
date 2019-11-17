import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class ChickenInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state={
            editable: false,
            editButtonText: 'Edytuj dane',
        };

        this.chickenTypeSelect = <select>
            <option value={'layer'}>Nioska</option>
            <option value={'meat_chicken'}>Mięsna</option>
            <option value={'rooster'}>Kogut</option>
        </select>;
    }

    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane'});
        } else {
            this.setState({editable: true, editButtonText: 'Anuluj edytowanie'});
        }
    }

    render() {
        return (
            <DialogContainer title={'Kurczak #{id}'} switchVisibility={() => this.props.switchVisibility()} saveButtonDisabled={!this.state.editable}>
                <fieldset disabled={!this.state.editable}>
                    <FormRow fieldName={'Rodzaj kurczaka'} input={this.chickenTypeSelect}/>
                    <FormRow fieldName={'Data urodzenia'} input={<input type={'date'} defaultValue={(new Date()).toLocaleDateString('en-CA')}></input>} />
                    <FormRow fieldName={'Masa [kg]'} input={<input type={'number'} min={0.0} defaultValue={4.5} step={0.01}></input>} />
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
                        <button type={'button'} class={'btn btn-danger'}>{'Zabij'}</button>
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
