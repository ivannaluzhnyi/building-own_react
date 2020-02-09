/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';

class Test extends React.Component {
    componentDidMount = () => {
        console.log('componentDidMount Test');
    };

    render() {
        return React.createElement(
            'div',
            { className: 'test' },
            'Test test element',
        );
    }
}

class Test2 extends React.Component {
    // componentDidMount = () => {
    //     console.log('componentDidMount Test2');
    // };

    render() {
        return React.createElement(
            'div',
            { className: 'test' },
            'Test22222 test element',
        );
    }
}

// function Test() {
//     return React.createElement(
//         'div',
//         { className: 'test' },
//         'Test test element',
//     );
// }

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Default',
        };
    }

    componentDidMount = () => {
        console.log('componentDidMount');
    };

    handleChangeText = () => {
        this.setState({ text: 'New Text to display' });
    };

    render() {
        const { text } = this.state;
        return React.createElement(
            'div',
            { className: 'test' },

            React.createElement(
                'button',
                {
                    type: 'button',
                    className: 'button-type',
                    onClick: () => this.handleChangeText(),
                    style: {
                        'background-color': 'red',
                        border: 'solid 1px blue',
                    },
                },
                'My Button',
            ),

            React.createElement(
                'h2',
                {
                    className: 'h2-type',
                },
                text,
            ),

            React.createElement(Test, {}, null),
            React.createElement(Test2, {}, null),
        );
    }
}

export default Main;
