import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';
import AddButton from './AddButton';
import axios from 'axios';
import isEqual from 'lodash';

const styles = {
    input: {
        maxWidth: '60px',
        marginLeft: 0,
        marginRight: 0,
    }
}

export default class WorkersDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            originalWorkers: [],
            deleted: [],
            messages: [],
            changes: [],
            editable: false,
            editButtonText: 'Edytuj'
        };
    }

    componentDidMount() {
        this.getWorkers();
    }

    getWorkers() {
        axios.get('/getWorkers/').then(response => {
            response = response.data;

            if(response.status && response.status == 'error') {
                console.log('cannot fetch workers');
            } else {
                let workers = response;
                this.setState({workers: workers.slice(), originalWorkers: workers.slice()});
            }
        });
    }

    onSave() {
        let newWorkers = this.state.workers.filter(item => item.id == '');
        let updatedWorkers = this.state.workers.filter(item => item.id && item.changed);
        let deletedWorkers = this.state.deleted;

        let data = {newWorkers, updatedWorkers, deletedWorkers};
        axios.post('/updateWorkers', data).then(response => {
            response = response.data;
            if(response.status && response.status == 'error' && response.messages) {
                this.setState({messages: Object.values(response.messages).flat()});
            } else {
                console.log(response);
                this.props.switchVisibility();
            }
        });
    }

    addWorker() {
        let workers = this.state.workers;
        workers.push({id: '', first_name: '', last_name: '', salary: ''});
        this.setState({workers});
    }

    deleteWorker(index) {
        let workers = this.state.workers.slice();
        if(workers[index].id) {
            let deleted = this.state.deleted;
            deleted.push(workers[index].id);
            this.setState({deleted});
        }

        delete workers[index];

        this.setState({workers});
    }

    render() {
        return (
            <DialogContainer
                messages={this.state.messages}
                onSubmit={() => this.onSave()}
                title={'Pracownicy'}
                switchVisibility={() => this.props.switchVisibility()}>
                    <div class={'container'}>
                        <div class={'row'}>
                            <span class={'col badge badge-success'}><h5>{'Imię'}</h5></span>
                            <span class={'col badge badge-success'}><h5>{'Nazwisko'}</h5></span>
                            <span class={'col badge badge-success'}><h5>{'Pensja'}</h5></span>
                        </div>
                    {this.state.workers.map((worker, index) => {
                        return <div class={'row'}>
                                        <div class={'col'}>
                                            <input onChange={event => {
                                                let workers = this.state.workers;
                                                workers[index].first_name = event.target.value;
                                                workers[index].changed = true;
                                                this.setState({workers});}}
                                            value={this.state.workers[index].first_name}
                                            style={styles.input} type={'text'}
                                            disabled={!this.state.editable} />
                                        </div>
                                        <div class={'col'}>
                                            <input onChange={event => {
                                                let workers = this.state.workers;
                                                workers[index].last_name = event.target.value;
                                                workers[index].changed = true;
                                                this.setState({workers})}}
                                            value={this.state.workers[index].last_name}
                                            style={styles.input}
                                            type={'text'}
                                            disabled={!this.state.editable} />
                                        </div>
                                        <div class={'col'}>
                                            <input
                                                step={0.01}
                                                min={0}
                                                style={styles.input} type={'number'}
                                                onChange={event => {
                                                    let workers = this.state.workers;
                                                    workers[index].salary = event.target.value;
                                                    workers[index].changed = true;
                                                    this.setState({workers})}}
                                                value={this.state.workers[index].salary}
                                                disabled={!this.state.editable}/>
                                        </div>
                                        {this.state.editable &&
                                        <div class={'col'}>
                                            <button onClick={() => {this.deleteWorker(index)}} type={'button'} class={'btn btn-danger'}> {'X'} </button>
                                        </div>
                                        }
                                    </div>
                    })}
                    <div class={'container row formRow'}>
                    {this.state.editable &&
                    <div class={'container col'}>
                        <AddButton onClick={() => this.addWorker()}/>    
                    </div>
                    }
                    </div>
                    <hr />
                    <div class={'container row formRow'}>
                        <div class={'col'}>
                            <button onClick={() => {let text = '';
                            if(this.state.editable)
                                text = 'Edytuj';
                            else text = 'Anuluj edytowanie';
                            this.setState({editable: !this.state.editable, editButtonText: text})}} class={'btn btn-warning'}> {this.state.editButtonText} </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </DialogContainer>
        );
    }
}

if (document.getElementById('workersDialog')) {
    ReactDOM.render(<WorkersDialog />, document.getElementById('workersDialog'));
}
