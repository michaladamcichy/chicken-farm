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

export default class TransactionInfoDialog extends Component {
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
        axios.get('/getTransactionItems/'+ String(this.props.transaction.id)).then(response => {
            let transactionItems = response.data;
            this.setState({transactionItems});
        });
    }

    render() {
        return (
            <DialogContainer title={'Transakcja #' + this.props.transaction.id} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => {} }>
                <FormRow fieldName={'Data'} input={<input type={'date'} value={this.props.transaction.date} disabled/>} />
                <FormRow fieldName={'Godzina'} input={<input type={'time'} value={this.props.transaction.time} disabled/>} />
                <FormRow fieldName={'Klient'} input={<input type={'text'} value={this.props.transaction.customer_name} disabled/>}/>
                <hr />
                <div class={'container'} style={styles.itemsContainer}>
                {this.state.transactionItems.map((item, index) => <TransactionItem disabled={true} index={index} products={this.props.products} item={this.state.transactionItems[index]}/>)}
                </div>
                <hr />
                <FormRow fieldName={'Razem'} input={<h5> {String(this.props.transaction.total) + ' zł'} </h5>} />
                <hr />
                <div class={'container col'}>
                    <button type={'button'} class={'btn btn-danger'} onClick={() => this.props.onTransactionDeleted(this.props.transaction.id)}>{'Usuń!'}</button>
                </div>
            </DialogContainer>
        );
    }
}

if (document.getElementById('transactionInfoDialog')) {
    ReactDOM.render(<TransactionInfoDialog />, document.getElementById('transactionInfoDialog'));
}
