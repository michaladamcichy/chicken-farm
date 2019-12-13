import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChickenHouse from './ChickenHouse';

const styles = {
    outerContainer: {
        width: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '5px dashed green',
        boxShadow: '0 0 20px 20px green',
    },
    hr: {
        borderTop: '5px dashed green',
    },
    buttonsRow: {
        margin: '20px',
    }
}

export default class DialogContainer extends Component {
    render() {
        return (
            <div class={'container'} style={styles.outerContainer}>
                <h2> {this.props.title} </h2>
                <hr style={styles.hr}/>
                {this.props.children}
                <div class={'container row'} style={styles.buttonsRow}>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-danger'}  onClick={()=> this.props.switchVisibility()}>{'Anuluj'}</button>
                    </div>
                    <div class={'container col'}>
                        <button type={'button'} class={'btn btn-success'} onClick={() => this.props.switchVisibility()}
                            disabled={this.props.saveButtonDisabled}>{'Zapisz'}</button>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('dialogContainer')) {
    ReactDOM.render(<DialogContainer />, document.getElementById('dialogContainer'));
}
