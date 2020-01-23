import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}
 

export default class EditChickenHouseDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size : this.props.chickenHouse.size,
            id: this.props.chickenHouse.id,
            editable: false,
            editButtonText: 'Edytuj',
        }

        this.lastSize = this.props.chickenHouse.size;
    }

    onSubmit() {
        this.props.onSubmit({id: this.state.id, size: this.state.size});
    }

    switchEditable() {
        if(this.state.editable) {
            this.setState({size: this.props.chickenHouse.size});
        }

        this.setState({editable: !this.state.editable, editButtonText: this.state.editable ? 'Edytuj' : 'Anuluj'});
    }

    onEditButtonClicked() {
        this.switchEditable();
    }
    
    render() {
        return (
            <DialogContainer
                title={'Edytuj kórnik #' + String(this.state.id)}
                switchVisibility={() => this.props.switchVisibility()}
                onSubmit={() => this.onSubmit()}>
                <FormRow fieldName={'Liczba grzęd'} input={<input type={'number'} min={1} value={this.state.size}
                    onChange={event => this.setState({size: event.target.value})} disabled={!this.state.editable}></input>} />
                <hr />
                <div class={'container row formRow'}>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-warning'} onClick={() => this.onEditButtonClicked()}>{this.state.editButtonText}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-danger'} onClick={() => this.props.onDelete()}>{'USUŃ!'}</button>
                    </div>
                </div>
                <hr />
            </DialogContainer>
        );
    }
}

if (document.getElementById('editChickenHouseDialog')) {
    ReactDOM.render(<EditChickenHouseDialog />, document.getElementById('editChickenHouseDialog'));
}
