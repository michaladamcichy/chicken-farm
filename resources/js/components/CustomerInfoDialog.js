import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {isEqual} from 'lodash';
import axios from 'axios';

const styles = {
}

export default class CustomerInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: Object.assign({}, this.props.customer),
            editable: false,
            editButtonText: 'Edytuj',
        }
    }

    setName(value) {
        let customer = this.state.customer;
        customer.name = value;
        this.setState({customer});
    }
    
    oncustomerAdded() {
        this.props.oncustomerAdded(this.state.customer);
    }
    
    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane', customer: Object.assign({}, this.props.customer)});
        } else {
            this.setState({editable: true, editButtonText: 'Anuluj edytowanie'});
        }
    }

    onCustomerUpdated() {
        if (isEqual(this.state.customer, this.props.customer) == false) {
            this.props.onCustomerUpdated(this.state.customer);
        }
    }

    onDeleteButtonClicked() {
        this.props.onCustomerDeleted();
    }

    render() {
        return (
            <DialogContainer title={'Klient #' + this.state.customer.id} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onCustomerUpdated() }>
                <fieldset disabled={!this.state.editable}>
                    <FormRow fieldName={'Nazwa'} input={<input onChange={event => this.setName(event.target.value)} value={this.state.customer.name} type={'text'}></input>} />
                </fieldset>
                <hr />
                <div class={'container row formRow'}>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-warning'} onClick={() => this.onEditButtonClicked()}>{this.state.editButtonText}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-danger'} onClick={() => this.onDeleteButtonClicked()}>{'Usuń!'}</button>
                    </div>
                </div>
                <hr />
            </DialogContainer>
        );
    }
}

if (document.getElementById('customerInfoDialog')) {
    ReactDOM.render(<CustomerInfoDialog />, document.getElementById('customerInfoDialog'));
}
