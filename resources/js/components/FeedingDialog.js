import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {getCurrentTime, getCurrentDate} from './utils';

const styles = {
}

export default class FeedingDialog extends Component {
    constructor(props) {
        super(props);
        console.log(getCurrentTime());
    }

    render() {
        return (
            <DialogContainer title={'Karmienie'} switchVisibility={() => this.props.switchVisibility()}>
                <FormRow fieldName={'Data'} input={<input type={'date'} defaultValue={getCurrentDate()}></input>} />
                <FormRow fieldName={'Godzina'} input={<input type={'time'} defaultValue={getCurrentTime()}></input>} />
                <FormRow fieldName={'Ilość karmy [kg]'} input={<input type={'number'} defaultValue={1.5} step={0.01}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('feedingDialog')) {
    ReactDOM.render(<FeedingDialog />, document.getElementById('feedingDialog'));
}
