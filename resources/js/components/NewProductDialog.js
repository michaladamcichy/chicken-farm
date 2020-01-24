import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class NewProductDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: '',
                unit_cost: 5.0
            }
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
    
    onProductAdded() {
        this.props.onProductAdded(this.state.product);
    }

    render() {
        return (
            <DialogContainer messages={this.props.messages} title={'Nowy produkt'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onProductAdded() }>
                <FormRow fieldName={'Nazwa'} input={<input onChange={event => this.setName(event.target.value.replace(/\s/g, "_"))} value={this.state.product.name} type={'text'}></input>} />
                <FormRow fieldName={'Koszt [zł/kg]'} input={<input onChange={event => this.setUnitCost(event.target.value)} value={this.state.product.unit_cost} type={'number'} min={0.0} step={0.01}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newProductDialog')) {
    ReactDOM.render(<NewProductDialog />, document.getElementById('newProductDialog'));
}
