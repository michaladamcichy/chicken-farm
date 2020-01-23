import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideButton from './SideButton';

const styles = {
    outerContainer: {
        width: '150px',
        height: '100%',
        position: 'fixed',
        alignItems: 'center',
        right: '0px',
        top: '0px',
        verticalAlign: 'top',
        backgroundColor: 'red',
        padding: '10px 10px 10px 10px',
    },
    buttonContainer: {
    }
};

export default class SideBarContainer extends Component {
    render() {
        return (
            <div class="container col" style={styles.outerContainer}>
                {this.props.children.map(button => {
                    return <div class="row justify-content-center" style={styles.buttonContainer}>
                            {button}
                        </div>
                })}
            </div>
        );
    }
}

if (document.getElementById('sideBarContainer')) {
    ReactDOM.render(<SideBarContainer />, document.getElementById('sideBarContainer'));
}
