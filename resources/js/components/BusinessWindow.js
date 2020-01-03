import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import ReactScrollTable from 'react-scroll-table';

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid blue',
    }
};

export default class BusinessWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.link ? this.props.link : 'NIE MA');
      }

    render() {
        const outerContainerStyle= {
            backgroundColor: 'white',
            border: '1px dashed green',
            height: this.props.height,
            // //overflow: 'auto',
            // //whiteSpace: 'nowrap',
            // display: 'flex',
            // width: '400px',
            // flexDirection: 'column',
        };

        return (
            <div class="col" style={outerContainerStyle}>
                <div style={styles.header}>
                    <a href={this.props.link ?  this.props.link : ''}><h2>{this.props.title ? this.props.title : ''}</h2></a>
                </div>
                <Table />
            </div>
        );
    }
}

if (document.getElementById('businessWindow')) {
    ReactDOM.render(<BusinessWindow />, document.getElementById('businessWindow'));
}
