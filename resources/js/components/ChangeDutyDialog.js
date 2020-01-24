import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import axios from 'axios';

const styles = {
}

export default class ChangeDutyDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            allWorkers: [],
            currentSelectValue: '',
            messages: [],
        };
    }

    componentDidMount() {
        this.getWorkers();
    }

    getWorkers() {
        axios.get('/getChickenhouseWorkers/' + String(this.props.chickenhouseId)).then(response => {
            response = response.data;

            if(typeof response.status != undefined && response.status == 'error') {
                console.log('cannot fetch workers');
            } else {
                response.all.unshift({id: '', first_name: '', last_name: ''});
                this.setState({allWorkers: response.all, workers: response.onDuty});
            }
        });
    }

    deleteWorker(workerId) {
        let workers = this.state.workers;
        
        workers.splice( workers.indexOf(workers.find(element => element.id == workerId)), 1 );
        this.setState({workers});
    }

    addWorker(workerId) {
        if(workerId != '' && !this.state.workers.map(worker => String(worker.id)).includes(String(workerId))) {
            let workers = this.state.workers;
            let worker = this.state.allWorkers.find(item => item.id == workerId);
            if(worker != undefined) {
                workers.push(worker);
            }
            this.setState({workers});
        }
    }

    onSave() {
        let data = {workers: this.state.workers.map(worker => worker.id), chickenhouseId: this.props.chickenhouseId};
        axios.post('/updateWorkersOnDuty', data).then(response => {
            response = response.data;
            if(response.status && response.status == 'error' && response.messages) {
                this.setState({messages: Object.values(response.messages).flat()});
            } else {
                this.props.switchVisibility();
            }
        });
    }

    render() {
        return (
            <DialogContainer messages={this.state.messages} onSubmit={() => this.onSave()} title={'Pracownicy odpowiedzialni'} switchVisibility={() => this.props.switchVisibility()}>
                {this.state.workers.map((worker, index) => {
                    return <FormRow fieldName={worker.first_name + ' ' + worker.last_name} input={<button onClick={() => {this.deleteWorker(worker.id)}} type={'button'} class={'btn btn-danger'}> {'X'} </button>} />
                }
                )}
                <FormRow fieldName={'Dodaj'} input={
                <select value={this.state.currentSelectValue} onChange={event => this.addWorker(event.target.value)}>{this.state.allWorkers.map(worker => {
                return <option value={worker.id}>{worker.first_name + ' ' + worker.last_name}</option>
                })}</select>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('changeDutyDialog')) {
    ReactDOM.render(<ChangeDutyDialog />, document.getElementById('changeDutyDialog'));
}
