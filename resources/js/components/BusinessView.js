import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideBarContainer from './SideBarContainer';
import SideButton from './SideButton';
import BusinessWindow from './BusinessWindow';

const styles = {
};

export default class BusinessView extends Component {
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
            marginTop: '20px',
            backgroundColor: 'white',
            border: '30px dashed green',
            //height: this.state.height - 110,
        };
        const windowHeight = (this.state.height - 110)/2-30;

        return (
            <div class="container" style={outerContainerStyle}>
                <div class={'container'}>
                    <div class={'row'}>
                        <BusinessWindow link={'/customers'} title={'KLIENCI'} height={windowHeight} />
                        <BusinessWindow link={'/products'} title={'PRODUKTY'} height={windowHeight} />
                    </div>
                    <div class={'row'}>
                        <BusinessWindow link={'/transactions'} title={'TRANSAKCJE'} height={windowHeight} />
                        <BusinessWindow link={'/storage'} title={'HISTORIA MAGAZYNU'} height={windowHeight} />
                    </div>
                </div>

                <SideBarContainer>
                    <SideButton title={'NOWY KLIENT'} onClick={() => {}}/>
                    <SideButton title={'NOWY PRODUKT'} onClick={() => {}}/>
                    <SideButton title={'NOWA TRANS.'} onClick={() => {}}/>
                    <SideButton title={'NOWY WPIS MAG.'} onClick={() => {}}/>
                </SideBarContainer>
            </div>
        );
    }
}

if (document.getElementById('businessView')) {
    ReactDOM.render(<BusinessView />, document.getElementById('businessView'));
}
