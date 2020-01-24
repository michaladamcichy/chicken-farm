import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import TransactionItem from './TransactionItem';
import FormRow from './FormRow';
import AddButton from './AddButton';
import axios from 'axios';
import { getCurrentDate, getCurrentTime } from './utils';

const styles = {
    itemsContainer: {
        maxHeight: '300px',
        overflowY: 'auto'
    }
}

export default class NewTransactionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: {
                date: getCurrentDate(),
                time: getCurrentTime(),
                customer_id: '',
                total: 0
            },
            customers: [],
            transactionItems: [],
            products: [],
        }
    }

    componentDidMount() {
        axios.get('/getCustomers').then(response => {
            let customers = response.data;
            customers.unshift({id: '', name: ''});
            this.setState({customers});
        });

        axios.get('/getProducts').then(response => {
            let products = response.data;
            products.unshift({id: '', name: ''});
            this.setState({products});
        });
    }

    setDate(value) {
        let transaction = this.state.transaction;
        transaction.date = value;
        this.setState({transaction});
    }

    setTime(value) {
        let transaction = this.state.transaction;
        transaction.time = value;
        this.setState({transaction});
    }

    setTotal(value) {
        let transaction = this.state.transaction;
        transaction.total = value;
        this.setState({transaction});
    }

    setCustomerId(value) {
        let transaction = this.state.transaction;
        transaction.customer_id = value;

        let customer_name = this.state.customers.find(item => item.id == transaction.customer_id).name;
        transaction.customer_name = customer_name ? customer_name : '';
        this.setState({transaction});
    }

    onTransactionAdded() {
        this.props.onTransactionAdded(this.state.transaction, this.state.transactionItems);
    }

    addItem() {
        let items = this.state.transactionItems;
        items.push({product_id: '', product_name: '', amount: 0});
        this.setState({transactionItems: items});
    }

    deleteItem(index) {
        let items = this.state.transactionItems;
        delete items[index];
        this.setState({transactionItems: items});
    }

    calculateTotal(transactionItems) {
        let sum = 0;

        transactionItems.forEach(item => {
            if(item.product_unit_cost && item.amount) {
                sum += item.product_unit_cost * item.amount;
            }
        });

        return sum;
    }

    filterProducts(products, productId) {
        let productsInUseIds = this.state.transactionItems.map(item => String(item.product_id));
        let output = products.filter(product => productsInUseIds.includes(String(product.id)) == false || product.id == productId ||
            product.id == '');
        return output;
    }

    render() {
        return (
            <DialogContainer title={'Nowa transakcja'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onTransactionAdded() }>
                <FormRow fieldName={'Data'} input={<input type={'date'} value={this.state.transaction.date} onChange={event => this.setDate(event.target.value)} ></input>} />
                <FormRow fieldName={'Godzina'} input={<input type={'time'} value={this.state.transaction.time} onChange={event => this.setTime(event.target.value)} ></input>} />
                <FormRow fieldName={'Klient'} input={<select  onChange={event => this.setCustomerId(event.target.value)} value={this.state.transaction.customer_id} >
                    {this.state.customers.map(customer => <option value={customer.id}>{customer.name}</option>)}
                        </select>}/>
                <hr />
                <div class={'container'} style={styles.itemsContainer}>
                {this.state.transactionItems.map((item, index) => <TransactionItem index={index} products={this.filterProducts(this.state.products, this.state.transactionItems[index].product_id)} item={this.state.transactionItems[index]}
                    setItem={item => { let transactionItems = this.state.transactionItems; transactionItems[index] = item; this.setState({transactionItems});}}
                    onDelete={index => this.deleteItem(index)} disabled={false}/>)}
                </div>
                <div class={'container row formRow'}>
                    <div class={'container col'}>
                        <AddButton onClick={() => this.addItem()}/>    
                    </div>
                </div>
                <hr />
                <FormRow fieldName={'Razem'} input={<h5> {String(Math.round(this.calculateTotal(this.state.transactionItems)*100)/100) + ' zł'} </h5>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newTransactionDialog')) {
    ReactDOM.render(<NewTransactionDialog />, document.getElementById('newTransactionDialog'));
}
