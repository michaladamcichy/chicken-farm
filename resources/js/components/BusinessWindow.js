import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import AddButton from './AddButton';

const styles = {
    header: {
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '4px dashed green',
        }
    };

    export default class BusinessWindow extends Component {
        constructor(props) {
            super(props);
            this.state = {headerHeight: 0};
            this.ref = React.createRef();
        }

        componentDidMount() {
            this.handleHeight();
            window.addEventListener('resize', this.handleHeight);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleHeight);
          }

        handleHeight() {
            let headerHeight = 0;
            if(this.headerRef != undefined && 'clientHeight' in this.headerRef) {
                console.log('header: ' + String(this.headerRef.clientHeight));
                headerHeight = this.headerRef.clientHeight;
            }
            
            let height = this.props.height - headerHeight/2;
            console.log('BUSINESS WINDOW: ' + String(height));
            this.setState({headerHeight});
        }

        render() {
            const outerContainerStyle= {
                backgroundColor: 'white',
                border: '2px dashed green',
                height: this.props.height,
            };

            return (
                <div ref={ref => this.ref = ref} id={'businessWindow'} class="col" style={outerContainerStyle}>
                    <div ref={ref => this.headerRef = ref} class={'row'} style={styles.header}>
                    <AddButton />
                        <a href={this.props.link ?  this.props.link : ''} class={'col'}><h2>{this.props.title ? this.props.title : ''}</h2></a>
                    </div>
                    <Table parentHeight={this.props.height - this.state.headerHeight - 5} rows={this.props.data} columns={this.props.columns}/>
                </div>
            );
        }
}

if (document.getElementById('businessWindow')) {
    
    ReactDOM.render(<BusinessWindow/>, document.getElementById('businessWindow'));
}
