import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    input : {
        height: '100%',
    }
}

export default class FormRow extends Component {
    render() {
        return (
            <div class={'container row align-items-center'}>
                <span class={'col badge badge-success'}><h5>{this.props.fieldName}</h5></span>
                <div class={'col'}>{this.props.input}</div>
            </div>
        );
    }
}

if (document.getElementById('formRow')) {
    ReactDOM.render(<FormRow />, document.getElementById('formRow'));
}
