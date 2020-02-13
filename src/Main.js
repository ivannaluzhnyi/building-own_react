/* eslint-disable react/no-unused-state */
/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';
import { Router } from '../modules/react-router/index.js';

import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';

import routes from './routes.js';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: '',
        };
    }

    handleSetPage = currentPage => {
        this.setState({
            currentPage,
        });
    };

    render() {
        return React.createElement(
            'div',
            { className: 'main-component' },

            React.createElement(Navbar, { handleSetPage: this.handleSetPage }),
            React.createElement(
                'div',
                {
                    className: 'container',
                },

                React.createElement(Router, { routes }),
            ),

            React.createElement(Footer, {}),
        );
    }
}

export default Main;
