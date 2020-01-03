import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class NewChickenDialog extends Component {
    constructor(props) {
        super(props);
        this.chickenTypeSelect = <select>
            <option value={'layer'}>Nioska</option>
            <option value={'meatchicken'}>Mięsna</option>
            <option value={'rooster'}>Kogut</option>
        </select>;
    }

    render() {
        return (
            <DialogContainer title={'Nowy kurczak'} switchVisibility={() => this.props.switchVisibility()}>
                <FormRow fieldName={'Rodzaj kurczaka'} input={this.chickenTypeSelect} />
                <FormRow fieldName={'Data urodzenia'} input={<input type={'date'} defaultValue={(new Date()).toLocaleDateString('en-CA')}></input>} />
                <FormRow fieldName={'Masa [kg]'} input={<input type={'number'} min={0.0} defaultValue={4.5} step={0.01}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newChickenDialog')) {
    ReactDOM.render(<NewChickenDialog />, document.getElementById('newChickenDialog'));
}
