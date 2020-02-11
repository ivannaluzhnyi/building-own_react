/* eslint-disable max-classes-per-file */
import React from '../modules/React/index.js';

import { searchEventsByLocationClient } from './apis/event.js';

import Navbar from './components/Navbar/Navbar.js';
// import HomeContainer from './containers/HomeContainer/HomeContainer.js';
import EventContainer from './containers/EventContainer/EventContainer.js';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loadedPageEvent: 1,
        };
    }

    componentDidMount = async () => {
        const { loadedPageEvent } = this.state;
        const res = await searchEventsByLocationClient(10, loadedPageEvent);
        // console.log('event => ', res);
        this.setState({ events: res });
    };

    handleLoadPlusEvent = async () => {
        const { events, loadedPageEvent } = this.state;
        const newLoadedPage = loadedPageEvent + 1;
        const res = await searchEventsByLocationClient(10, newLoadedPage);

        // console.log('handleLoadPlusEvent => ', res);

        this.setState({
            loadedPageEvent: newLoadedPage,
            events: [...events, ...res],
        });
    };

    render() {
        const { events } = this.state;
        return React.createElement(
            'div',
            { className: 'main-component' },

            React.createElement(Navbar, {}, null),
            React.createElement(
                'div',
                { className: 'container' },

                React.createElement('h3', {}, 'Test click'),

                React.createElement(
                    EventContainer,
                    { events, handleLoadPlusEvent: this.handleLoadPlusEvent },
                    null,
                ),
            ),
        );
    }
}

export default Main;
