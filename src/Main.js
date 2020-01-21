import React from '../modules/mini-react/index.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return React.createElement(
            'div',
            { className: 'main' },

            React.createElement('h1', null, 'Main Component'),
        );
    }
}

export default Main;
