/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';

import Navbar from './components/Navbar/Navbar.js';
// import HomeContainer from './containers/HomeContainer/HomeContainer.js';
import EventContainer from './containers/EventContainer/EventContainer.js';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    render() {
        const { loading } = this.state;
        return React.createElement(
            'div',
            { className: 'main-component' },

            React.createElement(Navbar, {}, null),
            React.createElement(
                'div',
                { className: 'container' },

                React.createElement(
                    'h3',
                    {
                        onClick: () => this.setState({ loading: true }),
                    },
                    'Test click',
                ),

                React.createElement('p', {}, loading),

                // React.createElement(HomeContainer, {}, null),
                React.createElement(EventContainer, {}, null),
            ),
        );
    }
}

export default Main;
