import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class NewChickenHouseDialog extends Component {
    render() {
        return (
            <DialogContainer title={'Nowy kórnik'} switchVisibility={() => this.props.switchVisibility()}>
                <FormRow fieldName={'Liczba grzęd'} input={<input type={'number'} min={1} defaultValue={16}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newChickenHouseDialog')) {
    ReactDOM.render(<NewChickenHouseDialog />, document.getElementById('newChickenHouseDialog'));
}
