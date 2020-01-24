import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    field : {
        height: '100%',
        maxWidth: '100px',
    },
    label: {
    }
}

export default class TransactionItem extends Component {
    constructor(props) {
        super(props);
        console.log(props.item);
    }

    render() {
        return (
            <div class={'container row align-items-center formRow'}>
                <select onChange={event => {
                        let item = this.props.item;
                        item.product_id = event.target.value;
                        item.product_unit_cost = this.props.products.find(product => product.id == item.product_id).unit_cost;
                        this.props.setItem(item);}}
                    value={this.props.item.product_id}
                    disabled={this.props.disabled}>
                        {this.props.products.map(product => <option value={product.id}> {product.name} </option>)}
                </select>
                <div class={'col'}>
                    <input style={styles.field} onChange={event => {let item = this.props.item; item.amount = event.target.value; this.props.setItem(item);}}
                        value={this.props.item.amount} type={'number'} min={0.0} step={0.01} disabled={this.props.disabled}></input>
                </div>
                <div class={'col'}>
                    <h5 style={styles.label}>{String(this.props.item.product_unit_cost && this.props.item.amount ? Math.round(this.props.item.product_unit_cost * this.props.item.amount * 100)/100 : 0.0) + ' zł'}</h5>
                </div>
                {this.props.disabled == false &&
                <div class={'col'}>
                    <button onClick={() => this.props.onDelete(this.props.index)} type={'button'} class={'btn btn-danger'}> {'X'} </button>
                </div>}
            </div>
        );
    }
}

if (document.getElementById('transactionItem')) {
    ReactDOM.render(<TransactionItem />, document.getElementById('transactionItem'));
}
