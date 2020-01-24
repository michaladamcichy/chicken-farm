import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import {isEqual} from 'lodash';
import axios from 'axios';

const styles = {
}

export default class StoragerecordInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storagerecord: Object.assign({}, this.props.storagerecord),
            editable: false,
            editButtonText: 'Edytuj',
        }
    }

    componentDidMount() {
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

    setProductId(value) {
        let storagerecord = this.state.storagerecord;
        storagerecord.product_id = value;
        this.setState({storagerecord});
    }
    
    onEditButtonClicked() {
        if(this.state.editable) {
            this.setState({editable: false, editButtonText: 'Edytuj dane', storagerecord: Object.assign({}, this.props.storagerecord)});
        } else {
            this.setState({editable: true, editButtonText: 'Anuluj edytowanie'});
        }
    }

    onStoragerecordUpdated() {
        if (isEqual(this.state.storagerecord, this.props.storagerecord) == false) {
            this.props.onStoragerecordUpdated(this.state.storagerecord);
        }
    }

    onDeleteButtonClicked() {
        this.props.onStoragerecordDeleted();
    }

    render() {
        return (
            <DialogContainer title={'Wpis magazynowy'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.onStoragerecordUpdated() }>
                <fieldset disabled={!this.state.editable}>
                    <FormRow fieldName={'Data'} input={<input type={'date'} value={this.state.storagerecord.date} onChange={event => this.setDate(event.target.value)} disabled></input>} />
                    <FormRow fieldName={'Godzina'} input={<input type={'time'} value={this.state.storagerecord.time} onChange={event => this.setTime(event.target.value)} disabled></input>} />
                    <FormRow fieldName={'Produkt'} input={<input type={'text'} value={this.state.storagerecord.name} disabled/>} />
                    <FormRow fieldName={'Ilość [kg]'} input={<input onChange={event => this.setAmount(event.target.value)} value={this.state.storagerecord.amount} type={'number'} min={0.0} step={0.01}></input>} />
                    <FormRow fieldName={'Typ'} input={<select onChange={event => this.setType(event.target.value)} value={this.state.storagerecord.type}>
                            <option value={'in'}> DOSTAWA </option>
                            <option value={'out'}> WYDANIE </option>
                        </select>}/>
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

if (document.getElementById('storagerecordInfoDialog')) {
    ReactDOM.render(<StoragerecordInfoDialog />, document.getElementById('storagerecordInfoDialog'));
}
