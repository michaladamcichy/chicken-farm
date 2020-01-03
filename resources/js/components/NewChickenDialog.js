import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogContainer from './DialogContainer';
import FormRow from './FormRow';

const styles = {
}

export default class NewChickenDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chicken: {
                birthdate: (new Date()).toLocaleDateString('en-CA'),
                weight: 4.5,
                type: 'layer',
                chickenhouse_id: this.props.chickenhouseId,
            }
        }
    }

    addChicken() {
        axios.post('/addChicken', this.state.chicken).then(response => {
            let chicken = response.data;
            if(typeof chicken.id != undefined) {
                this.props.onChickenAdded(chicken);
            }
        });

    }

    setBirthdate(value) {
        let chicken = this.state.chicken;
        chicken.birthdate = value;
        this.setState({chicken});
    }

    setType(value) {
        let chicken = this.state.chicken;
        chicken.type = value;
        this.setState({chicken});
    }

    setWeight(value) {
        let chicken = this.state.chicken;
        chicken.weight = value;
        this.setState({chicken});
    }

    render() {
        return (
            <DialogContainer title={'Nowy kurczak'} switchVisibility={() => this.props.switchVisibility()} onSubmit={() => this.addChicken()}>
                <FormRow fieldName={'Rodzaj kurczaka'} input={<select onChange={event => this.setType(event.target.value)}>
                        <option value={'layer'}>Nioska</option>
                        <option value={'meatchicken'}>Mięsna</option>
                        <option value={'rooster'}>Kogut</option>
                    </select>} />
                <FormRow fieldName={'Data urodzenia'} input={<input onChange={event => this.setBirthdate(event.target.value)} type={'date'} defaultValue={(new Date()).toLocaleDateString('en-CA')}></input>} />
                <FormRow fieldName={'Masa [kg]'} input={<input onChange={event => this.setWeight(event.target.value)} type={'number'} min={0.0} defaultValue={4.5} step={0.01}></input>} />
            </DialogContainer>
        );
    }
}

if (document.getElementById('newChickenDialog')) {
    ReactDOM.render(<NewChickenDialog />, document.getElementById('newChickenDialog'));
}
