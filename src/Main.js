/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';

import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
// import HomeContainer from './containers/HomeContainer/HomeContainer.js';
import EventContainer from './containers/EventContainer/EventContainer.js';

class Main extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'main-component' },

            React.createElement(Navbar, {}),
            React.createElement(
                'div',
                {
                    className: 'container',
                },

                React.createElement(EventContainer),
            ),

            React.createElement(Footer, {}),
        );
    }
}

export default Main;
