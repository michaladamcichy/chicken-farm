import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {getCurrentDate, getCurrentTime} from './utils';
import axios from 'axios';

const styles = {
}

export default class NewStoragerecordDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storagerecord: {
                date: getCurrentDate(),
                time: getCurrentTime(),
                amount: 5.0,
                type: 'in',
                product_id: '',
                product_name: '',
            },
                products: []
            }
    }

    componentDidMount() {
        axios.get('/getProducts').then(response => {
            let products = response.data;
            products.unshift({id: '', name: ''});
            this.setState({products})
        });
    }

    setDate(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.date = value;
        this.setState({storagerecord});
    }

    setTime(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.time = value;
        this.setState({storagerecord});
    }

    setAmount(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.amount = value;
        this.setState({storagerecord});
    }

    setType(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.type = value;
        this.setState({storagerecord});
    }

    setProduct(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.product_id = value;
        storagerecord.product_name = this.state.products.find(element => element.id == storagerecord.product_id).name;
        this.setState({storagerecord});
    }
    
    onStoragerecordAdded() {
        this.props.onStoragerecordAdded(this.state.storagerecord);
    }

    render() {
        return (
            <DialogContainer messages={this.props.messages} title={'Nowy wpis magazynowy'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onStoragerecordAdded() }>
                <FormRow fieldName={'Data'} input={<input type={'date'} value={this.state.storagerecord.date} onChange={event => this.setDate(event.target.value)}></input>} />
                <FormRow fieldName={'Godzina'} input={<input type={'time'} value={this.state.storagerecord.time} onChange={event => this.setTime(event.target.value)}></input>} />
                <FormRow fieldName={'Produkt'} input={<select onChange={event => this.setProduct(event.target.value)} value={this.state.storagerecord.product_id}>
                        {this.state.products.map(product => <option value={product.id}> {product.name} </option>)}
                    </select>}/>
                <FormRow fieldName={'Ilość [kg]'} input={<input onChange={event => this.setAmount(event.target.value)} value={this.state.storagerecord.amount} type={'number'} min={0.0} step={0.01}></input>} />
                <FormRow fieldName={'Typ'} input={<select onChange={event => this.setType(event.target.value)} value={this.state.storagerecord.type}>
                        <option value={'in'}> DOSTAWA </option>
                        <option value={'out'}> WYDANIE </option>
                    </select>}/>                    
            </DialogContainer>
        );
    }
}

if (document.getElementById('newStoragerecordDialog')) {
    ReactDOM.render(<NewStoragerecordDialog />, document.getElementById('newStoragerecordDialog'));
}
