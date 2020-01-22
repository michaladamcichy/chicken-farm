import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import BusinessWindow from './BusinessWindow';
import NewProductDialog from './NewProductDialog';
import NewCustomerDialog from './NewCustomerDialog';
import NewStoragerecordDialog from './NewStoragerecordDialog';
import ProductInfoDialog from './ProductInfoDialog';
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
            productInfoDialogVisible: false,
            products: this.props.products,
            transactions: this.props.transactions,
            customers: this.props.customers,
            storagerecords: this.props.storagerecords,
            
            currentProduct: null,

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

            if(response.status != undefined && response.status == 'error') {
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

    onCustomerAdded(customer) {
        axios.post('/addCustomer', customer).then(response => {
            response = response.data;
            let customer = response;

            if(response.status != undefined && response.status == 'error') {
                console.log('Cannot add new customer');
            } else {
                let customers = this.state.customers;
                customers.push(customer);
                this.setState({customers});
            }
        });
    }

    onStoragerecordAdded(storagerecord) {
        axios.post('/addStoragerecord', storagerecord).then(response => {
            response = response.data;
            let storagerecord = response;

            if(response.status != undefined && response.status == 'error') {
                console.log('Cannot add new storage record');
            } else {
                console.log('storage record added');
                console.log(storagerecord);
                let storagerecords = this.state.storagerecords;
                storagerecords.push(storagerecord);
                this.setState({storagerecords});
            }
        });
    }

    productInfo(product) {
        this.setState({productInfoDialogVisible: true, currentProduct: product});
    }

    onProductUpdated(product) {
        axios.post('/updateProduct', product).then(response => {
            response = response.data;

            if(response.status != undefined && response.status == 'error') {
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
            
            if(response.status != undefined && response.status == 'error') {
                console.log('Cannot delete product with id ' + this.state.currentProduct.id);
            } else {
                let products = this.state.products;
                products = products.filter(product => product.id != this.state.currentProduct.id);

                this.setState({productInfoDialogVisible: false, products});
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
                        <BusinessWindow data={this.state.transactions} columns={['id','date','time','total', 'customer_id']} link={'/transactions'} title={'TRANSAKCJE'} height={windowHeight} />
                    </div>
                    <div class={'row'}>
                        <BusinessWindow data={this.state.customers} columns={['ID','Imie i nazwisko']} link={'/customers'} title={'KLIENCI'} height={windowHeight}
                            onNewItemClicked={() => {this.setState({newCustomerDialogVisible: true})}} />
                        <BusinessWindow data={this.state.storagerecords} columns={['data','time','amount','type','product_id']} link={'/storage'} title={'HISTORIA MAGAZYNU'} height={windowHeight}
                            onNewItemClicked={() => this.setState({newStoragerecordDialogVisible: true})}/>
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
                
                {this.state.productInfoDialogVisible &&
                <ProductInfoDialog onProductUpdated={product => this.onProductUpdated(product)} onProductDeleted={() => this.onProductDeleted()} product={this.state.currentProduct} switchVisibility={() => this.setState({productInfoDialogVisible: !this.state.productInfoDialogVisible})} />}               
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
