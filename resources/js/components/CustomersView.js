import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import BusinessWindow from './BusinessWindow';

const styles = {
};

export default class CustomersView extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
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

    render() {
        const outerContainerStyle= {
            //width: '600px',
            marginTop: '20px',
            backgroundColor: 'white',
            border: '30px dashed green',
            //height: this.state.height - 110,
        };
        const windowHeight = (this.state.height - 110) -60;

        return (
            <div class="container" style={outerContainerStyle}>
                <BusinessWindow title={'KLIENCI'} height={windowHeight} />
                <SideBarContainer>
                    <SideButton title={'NOWY KLIENT'} onClick={() => {}}/>
                    <SideButton title={'NOWY KLIENT'} onClick={() => {}}/>
                </SideBarContainer>
            </div>
        );
    }
}

if (document.getElementById('customersView')) {
    ReactDOM.render(<CustomersView />, document.getElementById('customersView'));
}
