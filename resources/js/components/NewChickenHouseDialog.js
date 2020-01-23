import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}
 
export default class NewChickenHouseDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {size : 16}
    }

    onSubmit() {
        this.props.onSubmit(this.state.size);
    }
    
    render() {
        return (
            <DialogContainer
                title={'Nowy kórnik'}
                switchVisibility={() => this.props.switchVisibility()}
                onSubmit={() => this.onSubmit()}>
                <FormRow fieldName={'Liczba grzęd'} input={<input type={'number'} min={1} value={this.state.size} onChange={event => this.setState({size: event.target.value})}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newChickenHouseDialog')) {
    ReactDOM.render(<NewChickenHouseDialog />, document.getElementById('newChickenHouseDialog'));
}
