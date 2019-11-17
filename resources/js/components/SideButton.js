import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    outerContainer : {
        
    },
    button : {
        width: '100px',
        height: '100px',
        margin: '10px'
    }
};

export default class SideButton extends Component {
    render() {
        return (
            <div style={styles.outerContainer}>
                <button onClick={() => this.props.onClick()} style={styles.button} type="button" class="btn btn-warning">
                    {this.props.title}
                </button>
            </div>
        );
    }
}

if (document.getElementById('sideButton')) {
    ReactDOM.render(<SideBarContainer />, document.getElementById('sideButton'));
}
