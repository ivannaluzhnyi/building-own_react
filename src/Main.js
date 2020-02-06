import React from '../modules/React/index.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Default',
        };
    }

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
        );
    }
}

export default Main;
