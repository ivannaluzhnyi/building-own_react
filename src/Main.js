/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';

import Navbar from './components/Navbar/Navbar.js';
import HomeContainer from './containers/HomeContainer/HomeContainer.js';

class Main extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'main-component' },

            React.createElement(Navbar, {}, null),
            React.createElement(HomeContainer, {}, null),
        );
    }
}

export default Main;
