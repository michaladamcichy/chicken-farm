import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class NewCustomerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                name: '',
            }
        }
    }

    setName(value) {
        let customer = this.state.customer;
        customer.name = value;
        this.setState({customer});
    }

    onCustomerAdded() {
        this.props.onCustomerAdded(this.state.customer);
    }

    render() {
        return (
            <DialogContainer messages={this.props.messages} title={'Nowy klient'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onCustomerAdded() }>
                <FormRow fieldName={'Nazwa klienta'} input={<input onChange={event => this.setName(event.target.value.replace(/\s/g, "_"))} value={this.state.customer.name} type={'text'}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newCustomerDialog')) {
    ReactDOM.render(<NewCustomerDialog />, document.getElementById('newCustomerDialog'));
}
