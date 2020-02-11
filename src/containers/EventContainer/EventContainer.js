import React from '../../../modules/React/index.js';
import PropTypes from '../../../modules/PropTypes/PropTypes.js';
import Button from '../../components/Button/Button.js';
import { searchEventsByLocationClient } from '../../apis/event.js';

import EventMapItem from './EventMapItem.js';

class EventContainer extends React.Component {
    constructor(props) {
        super(props);
        this.propTypes = {
            events: PropTypes.array.isRequired,
        };

        this.state = {
            events: [],
            loadedPageEvent: 1,
        };
    }

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
        // const { events, handleLoadPlusEvent } = this.props;
        const { events } = this.state;

        return React.createElement(
            'div',
            { className: 'event-container' },

            React.createElement(
                'section',
                {},

                React.createElement('h3', {}, 'Upcoming events '),

                React.createElement(
                    'div',
                    { className: 'row' },

                    ...events.map(event =>
                        React.createElement(EventMapItem, { event }),
                    ),
                ),

                React.createElement(
                    'div',
                    { className: 'col 12' },

                    React.createElement(
                        Button,
                        {
                            ...Button.props({
                                title: "Charger plus d'événements ... ",
                                onClick: () => this.handleLoadPlusEvent(),
                            }),
                        },
                        null,
                    ),
                ),
            ),
        );
    }
}

export default EventContainer;
