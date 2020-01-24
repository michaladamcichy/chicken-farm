import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {isEqual} from 'lodash';
import axios from 'axios';

const styles = {
}

export default class ProductInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: Object.assign({}, this.props.product),
            editable: false,
            editButtonText: 'Edytuj',
        }
    }

    setName(value) {
        let product = this.state.product;
        product.name = value;
        this.setState({product});
    }

    setUnitCost(value) {
        let product = this.state.product;
        product.unit_cost = value;
        this.setState({product});
    }
    
    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane', product: Object.assign({}, this.props.product)});
        } else {
            this.setState({editable: true, editButtonText: 'Anuluj edytowanie'});
        }
    }

    onProductUpdated() {
        if (isEqual(this.state.product, this.props.product) == false) {
            this.props.onProductUpdated(this.state.product);
        }
    }

    onDeleteButtonClicked() {
        this.props.onProductDeleted();
    }

    render() {
        return (
            <DialogContainer messages={this.props.messages} title={'Produkt #' + this.state.product.id} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onProductUpdated() }>
                <fieldset disabled={!this.state.editable}>
                    <FormRow fieldName={'Nazwa'} input={<input onChange={event => this.setName(event.target.value.replace(/\s/g, "_"))} value={this.state.product.name} type={'text'}></input>} />
                    <FormRow fieldName={'Koszt [zł/kg]'} input={<input onChange={event => this.setUnitCost(event.target.value)} value={this.state.product.unit_cost} type={'number'} min={0.0} step={0.01}></input>} />
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

if (document.getElementById('productInfoDialog')) {
    ReactDOM.render(<ProductInfoDialog />, document.getElementById('productInfoDialog'));
}
