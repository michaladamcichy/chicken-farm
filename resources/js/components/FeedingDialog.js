import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {getCurrentTime, getCurrentDate} from './utils';
import axios from 'axios';

const styles = {
}

export default class FeedingDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: getCurrentDate(),
            time: getCurrentTime(),
            amount: 1.5,
            lastFeeding: '',
        }
    }

    componentDidMount() {
        axios.get('/getLastFeeding/' + String(this.props.chickenhouseId)).then(response => {
            response = response.data;

            if(typeof response.status != undefined && response.status == 'error') {
                console.log('Cannot fetch last feeding date');
            } else {
                this.setState({lastFeeding: response.date + ' ' + response.time});
            }
        });
    }

    onSubmit() {
        let feeding = {
            date: this.state.date,
            time: this.state.time,
            fodder_amount: this.state.amount
        };
        this.props.onFeeding(feeding);
    }

    render() {
        return (
            <DialogContainer onSubmit={() => this.onSubmit()} title={'Karmienie'} switchVisibility={() => this.props.switchVisibility()}>
                <div class={'row'}>
                    <h5 class={'col'}> {this.state.lastFeeding ? 'Ostatnie karmienie: ' + this.state.lastFeeding : 'Te kurczaki jeszcze nigdy nie były karmione!'} </h5>
                </div>
                <FormRow fieldName={'Data'} input={<input type={'date'} value={this.state.date} onChange={event => this.setState({date: event.target.value})}></input>} />
                <FormRow fieldName={'Godzina'} input={<input type={'time'} value={this.state.time} onChange={event => this.setState({time: event.target.value})}></input>} />
                <FormRow fieldName={'Ilość karmy [kg]'} input={<input type={'number'} value={this.state.amount} step={0.01} onChange={event => this.setState({amount: event.target.value})}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('feedingDialog')) {
    ReactDOM.render(<FeedingDialog />, document.getElementById('feedingDialog'));
}
