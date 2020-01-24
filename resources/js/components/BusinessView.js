import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import BusinessWindow from './BusinessWindow';
import NewProductDialog from './NewProductDialog';
import NewCustomerDialog from './NewCustomerDialog';
import NewStoragerecordDialog from './NewStoragerecordDialog';
import NewTransactionDialog from './NewTransactionDialog';
import ProductInfoDialog from './ProductInfoDialog';
import CustomerInfoDialog from './CustomerInfoDialog';
import StoragerecordInfoDialog from './StoragerecordInfoDialog';
import TransactionInfoDialog from './TransactionInfoDialog';
import {isEqual} from 'lodash';
import axios from 'axios';

const styles = {
};

export default class BusinessView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            newProductDialogVisible: false,
            newCustomerDialogVisible: false,
            newStoragerecordDialogVisible: false,
            newTransactionDialogVisible: false,

            productInfoDialogVisible: false,
            customerInfoDialogVisible: false,
            transactionInfoDialogVisible: false,
            
            products: this.props.products,
            transactions: this.props.transactions,
            customers: this.props.customers,
            storagerecords: this.props.storagerecords,
            
            currentProduct: null,
            currentCustomer: null,
            currentStoragerecord: null,
            currentTransaction: null,

        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onProductAdded(product) {
        axios.post('/addProduct', product).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Cannot add new product');
            } else {
                let product = response;
                console.log('Product added');
                let products = this.state.products;
                products.push(product);
                this.setState({products});
            }
        });
    }

    productInfo(product) {
        this.setState({productInfoDialogVisible: true, currentProduct: product});
    }

    onProductUpdated(product) {
        axios.post('/updateProduct', product).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Cannot update product');
            } else {
                let product = response;

                let products = this.state.products;
                for(let i=0; i<products.length; i++) {
                    if(products[i].id == product.id) {
                        products[i] = product;
                        break;
                    }                    
                }
                this.setState({products});
            }
        });
    }

    onProductDeleted() {
        axios.delete('/deleteProduct/' + String(this.state.currentProduct.id)).then(response => {
            response = response.data;
            
            if(response.status && response.status == 'error') {
                console.log('Cannot delete product with id ' + this.state.currentProduct.id);
            } else {
                let products = this.state.products;
                products = products.filter(product => product.id != this.state.currentProduct.id);

                this.setState({productInfoDialogVisible: false, products});
            }
        });
    }

    onCustomerAdded(customer) {
        axios.post('/addCustomer', customer).then(response => {
            response = response.data;
            let customer = response;

            if(response.status && response.status == 'error') {
                console.log('Cannot add new customer');
            } else {
                let customers = this.state.customers;
                customers.push(customer);
                this.setState({customers});
            }
        });
    }

    customerInfo(customer) {
        this.setState({customerInfoDialogVisible: true, currentCustomer: customer});
    }

    onCustomerUpdated(customer) {
        axios.post('/updateCustomer', customer).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Cannot update customer');
            } else {
                let customer = response;

                let customers = this.state.customers;
                for(let i=0; i<customers.length; i++) {
                    if(customers[i].id == customer.id) {
                        customers[i] = customer;
                        break;
                    }                    
                }
                this.setState({customers});
            }
        });
    }

    onCustomerDeleted() {
        axios.delete('/deleteCustomer/' + String(this.state.currentCustomer.id)).then(response => {
            response = response.data;
            
            if(response.status && response.status == 'error') {
                console.log('Cannot delete customer with id ' + this.state.currentCustomer.id);
            } else {
                let customers = this.state.customers;
                customers = customers.filter(customer => customer.id != this.state.currentCustomer.id);

                this.setState({customerInfoDialogVisible: false, customers});
            }
        });
    }

    onStoragerecordAdded(storagerecord) {
        let product_name = storagerecord.product_name;
        delete storagerecord.product_name;

        axios.post('/addStoragerecord', storagerecord).then(response => {
            response = response.data;
            let storagerecord = response;

            if(response.status && response.status == 'error') {
                console.log('Cannot add new storage record');
            } else {
                console.log('storage record added');
                storagerecord.name = product_name;
                let storagerecords = this.state.storagerecords;
                storagerecords.push(storagerecord);
                this.setState({storagerecords});
            }
        });
    }

    storagerecordInfo(storagerecord) {
        this.setState({storagerecordInfoDialogVisible: true, currentStoragerecord: storagerecord});
    }

    isStoragerecordEqual(a, b) {
        return a.product_id == b.product_id && a.date == b.date && a.time == b.time;
    }

    onStoragerecordUpdated(storagerecord) {
        let product_name = storagerecord.name;
        delete storagerecord.name
        axios.post('/updateStoragerecord', storagerecord).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Cannot update storagerecord');
            } else {
                let storagerecord = response;
                storagerecord.name = product_name;

                let storagerecords = this.state.storagerecords;
                for(let i=0; i<storagerecords.length; i++) {
                    if(this.isStoragerecordEqual(storagerecord, storagerecords[i])) {
                        storagerecords[i] = storagerecord;
                        break;
                    }                    
                }
                this.setState({storagerecords});
            }
        });
    }

    onStoragerecordDeleted() {
        axios.post('/deleteStoragerecord/', this.state.currentStoragerecord).then(response => {
            response = response.data;
            
            if(response.status && response.status == 'error') {
                console.log('Cannot delete storagerecord with id ' + this.state.currentStoragerecord.id);
            } else {
                let storagerecords = this.state.storagerecords;
                storagerecords = storagerecords.filter(storagerecord => isEqual(storagerecord, this.state.currentStoragerecord) == false);

                this.setState({storagerecordInfoDialogVisible: false, storagerecords});
            }
        });
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

    onTransactionAdded(transaction, transactionItems) {
        let customer_name = transaction.customer_name;
        delete transaction.customer_name;

        transaction.total = this.calculateTotal(transactionItems);

        let data = {transaction, transactionItems: transactionItems.map(item => {return {product_id: item.product_id, amount: item.amount}})};

        axios.post('/addTransaction', data).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Cannot add new transaction');
            } else {
                let transaction = response;
                transaction.customer_name = customer_name;
                console.log('Transaction added');
                let transactions = this.state.transactions;
                transactions.push(transaction);
                this.setState({transactions});
            }
        });
    }

    transactionInfo(transaction) {
        this.setState({transactionInfoDialogVisible: true, currentTransaction: transaction});
    }

    onTransactionDeleted(id) {
        axios.delete('/deleteTransaction/' + String(id)).then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('Nie udalo sie usunac transackji!');
            } else {
                let transactions = this.state.transactions;
                transactions = transactions.filter(item => item.id != id);
                this.setState({transactions, transactionInfoDialogVisible: false});
            }
        });
    }

    render() {
        const outerContainerStyle= {
            marginTop: '20px',
            backgroundColor: 'white',
            border: '30px dashed green',
            //height: this.state.height - 110,
        };
        const windowHeight = (this.state.height - 110)/2-30;

        return (
            <div class="container" style={outerContainerStyle}>
                <div class={'container'}>
                    <div class={'row'}>
                        <BusinessWindow data={this.state.products} columns={['id', 'name', 'unit_cost']} link={'/products'} title={'PRODUKTY'} height={windowHeight}
                            onNewItemClicked={() => {this.setState({newProductDialogVisible: true})}}
                            onItemSelected={product => this.productInfo(product)}/>
                        <BusinessWindow data={this.state.transactions} columns={['id','date','time','total', 'c_id', 'c_name']} link={'/transactions'} title={'TRANSAKCJE'} height={windowHeight}
                            onNewItemClicked={() => this.setState({newTransactionDialogVisible: true})}
                            onItemSelected={transaction => this.transactionInfo(transaction)}/>
                    </div>
                    <div class={'row'}>
                        <BusinessWindow data={this.state.customers} columns={['ID','Imie i nazwisko']} link={'/customers'} title={'KLIENCI'} height={windowHeight}
                            onNewItemClicked={() => {this.setState({newCustomerDialogVisible: true})}}
                            onItemSelected={customer => this.customerInfo(customer)}/>
                        <BusinessWindow data={this.state.storagerecords} columns={['date','time','amount','type', 'pr_id', 'pr_name']} link={'/storage'} title={'HISTORIA MAGAZYNU'} height={windowHeight}
                            onNewItemClicked={() => this.setState({newStoragerecordDialogVisible: true})}
                            onItemSelected={storagerecord => this.storagerecordInfo(storagerecord)}/>
                    </div>
                </div>

                <SideBarContainer>
                    <SideButton title={'NOWY KLIENT'} onClick={() => {}}/>
                    <SideButton title={'NOWY PRODUKT'} onClick={() => {}}/>
                    <SideButton title={'NOWA TRANS.'} onClick={() => {}}/>
                    <SideButton title={'NOWY WPIS MAG.'} onClick={() => {}}/>
                </SideBarContainer>

                {this.state.newProductDialogVisible &&
                <NewProductDialog onProductAdded={chicken => this.onProductAdded(chicken)} switchVisibility={() => this.setState({newProductDialogVisible: !this.state.newProductDialogVisible})} />}
                {this.state.newCustomerDialogVisible &&
                <NewCustomerDialog onCustomerAdded={customer => this.onCustomerAdded(customer)} switchVisibility={() => this.setState({newCustomerDialogVisible: !this.state.newCustomerDialogVisible})} />}
                {this.state.newStoragerecordDialogVisible &&
                <NewStoragerecordDialog onStoragerecordAdded={storagerecord => this.onStoragerecordAdded(storagerecord)} switchVisibility={() => this.setState({newStoragerecordDialogVisible: !this.state.newStoragerecordDialogVisible})} />}
                {this.state.newTransactionDialogVisible &&
                <NewTransactionDialog onTransactionAdded={(transaction, transactionItems) => this.onTransactionAdded(transaction, transactionItems)} switchVisibility={() => this.setState({newTransactionDialogVisible: !this.state.newTransactionDialogVisible})} />}           
                
                {this.state.productInfoDialogVisible &&
                <ProductInfoDialog onProductUpdated={product => this.onProductUpdated(product)} onProductDeleted={() => this.onProductDeleted()} product={this.state.currentProduct} switchVisibility={() => this.setState({productInfoDialogVisible: !this.state.productInfoDialogVisible})} />}               
                {this.state.customerInfoDialogVisible &&
                <CustomerInfoDialog onCustomerUpdated={customer => this.onCustomerUpdated(customer)} onCustomerDeleted={() => this.onCustomerDeleted()} customer={this.state.currentCustomer} switchVisibility={() => this.setState({customerInfoDialogVisible: !this.state.customerInfoDialogVisible})} />}               
                {this.state.storagerecordInfoDialogVisible &&
                <StoragerecordInfoDialog onStoragerecordUpdated={storagerecord => this.onStoragerecordUpdated(storagerecord)} onStoragerecordDeleted={() => this.onStoragerecordDeleted()} storagerecord={this.state.currentStoragerecord} switchVisibility={() => this.setState({storagerecordInfoDialogVisible: !this.state.storagerecordInfoDialogVisible})} />}
                {this.state.transactionInfoDialogVisible &&
                <TransactionInfoDialog transaction={this.state.currentTransaction} products={this.state.products} switchVisibility={() => this.setState({transactionInfoDialogVisible: !this.state.transactionInfoDialogVisible})}
                    onTransactionDeleted={id => this.onTransactionDeleted(id)}/>}  
            </div>
        );
    }
}

if (document.getElementById('businessView')) {
    const element = document.getElementById('businessView');
    let customers = element.getAttribute('customers');
    let products = element.getAttribute('products');
    let transactions = element.getAttribute('transactions');
    let storagerecords = element.getAttribute('storagerecords');

    ReactDOM.render(<BusinessView
        customers={JSON.parse(customers)}
        products={JSON.parse(products)}
        transactions={JSON.parse(transactions)}
        storagerecords={JSON.parse(storagerecords)}/>, document.getElementById('businessView'));
}
