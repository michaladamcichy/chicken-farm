import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class ChangeDutyDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: ['Michał Cichy', 'Dominik Stachowiak', 'Arnold Schwarzenegger'],
            allWorkers: ['','Michał Cichy', 'Dominik Stachowiak', 'Tom Cruise', 'Eugeniusz Bodo', 'Jan Kowalski'],
            currentSelectValue: '',
        };
    }

    deleteWorker(worker) {
        let workers = this.state.workers;
        for(let i =0; i < workers.length; i++) {
            if (workers[i] == worker) {
                delete workers[i];
                i--;
            }
        }
        this.setState({workers});
    }

    addWorker(worker) {
        if(worker != '' && !this.state.workers.includes(worker)) {
            let workers = this.state.workers;
            workers.push(worker);
            this.setState({workers});
        }
    }

    render() {
        return (
            <DialogContainer title={'Pracownicy odpowiedzialni'} switchVisibility={() => this.props.switchVisibility()}>
                {this.state.workers.map((worker, index) => {
                    return <FormRow fieldName={worker} input={<button onClick={() => {this.deleteWorker(worker)}} type={'button'} class={'btn btn-danger'}> X </button>} />
                }
                )}
                <FormRow fieldName={'Dodaj'} input={<select onChange={event => this.addWorker(event.target.value)}>{this.state.allWorkers.map(worker => {
                return <option value={worker}>{worker}</option>
                })}</select>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('changeDutyDialog')) {
    ReactDOM.render(<ChangeDutyDialog />, document.getElementById('changeDutyDialog'));
}
