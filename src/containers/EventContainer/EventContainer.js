import React from '../../../modules/React/index.js';

// import { isEmpty } from '../../utils/helper.js';

import { searchEventsByLocationClient } from '../../apis/event.js';

const EventItem = () => {
    // console.log('event => ', event);
    return React.createElement('div', { className: 'col s12 m3 ' }, 'Event');
};

class EventContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loadedPage: 1,
        };
    }

    componentDidMount = async () => {
        const { loadedPage } = this.state;
        const res = await searchEventsByLocationClient(5, loadedPage);
        // const res2 = await searchEventsByLocationClient(10, 2);

        this.setState({ events: res });
    };

    render() {
        const { events, loadedPage } = this.state;
        // console.log('events => ', events);
        // console.log('events isEmpty => ', isEmpty(events));

        console.log('state => ', this.state);
        return React.createElement(
            'div',
            { className: 'event-container' },

            React.createElement(
                'section',
                {},

                React.createElement(
                    'h3',
                    {
                        onClick: () => this.setState({ loadedPage: 2 }),
                    },
                    'Upcoming events (Test click)',
                ),
                React.createElement('p', {}, loadedPage),

                // !isEmpty(events)
                React.createElement(
                    'div',
                    { className: 'row' },

                    ...events.map(event =>
                        React.createElement(EventItem, { event }),
                    ),
                ),
                // : '',
            ),
        );
    }
}

export default EventContainer;
